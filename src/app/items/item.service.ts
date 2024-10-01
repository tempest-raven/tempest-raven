import { Injectable } from '@angular/core';
import { requestService } from '../shared/types';
import { SonnyTranslationService } from '../sonny-translation.service';
import { Item } from './item';
import { Identifier, Literal, MemberExpression, Parser, Pattern, UnaryExpression } from 'acorn';
import { simple } from 'acorn-walk';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements requestService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_16.as";
  public itemList = new Map<number, Item>();
  public request: Promise<Map<number, Item>>;

  constructor(private translationService: SonnyTranslationService) {
    const requests = Promise.all([
      translationService.request, 
      fetch(ItemService.scriptLocation).then(res => res.text())
    ]).then(([langStrings, itemScript]) => {
      Item.langStrings = langStrings;
      return this.parseItemScript(itemScript);
    });
    this.request = requests; 
  }
  
  parseItemScript(itemScript: string): any {
    let AST = Parser.parse(itemScript, {
      ecmaVersion: 3,
    });
    let programState = {
      id: 0,
      items: this.itemList,
      lastItem: undefined as Item | undefined,
      stats: {
        HealthUP : 0,
        StrengthUP : 0,
        MagicUP : 0,
        SpeedUP : 0,
        FocusUP : 0,
        PIU : [0,0,0,0,0,0,0,0],
        DIU : [0,0,0,0,0,0,0,0],
      }
    };
    simple(AST, {
      CallExpression(fnCall, state) {
        if (fnCall.callee.type === "Identifier" && fnCall.callee.name === "createNewItemKrin"){
          programState.id++;
          let params: (string | number)[] = [];
          simple(fnCall, {
            UnaryExpression(unary, state) {
              state.push(Number(unary.operator + ((unary.argument as Literal).value)));
            },
            Literal(literal, state) {
              state.push(literal.value as string | number);
            }
          }, undefined, params);
          let itemParams = [programState.id, ...params] as ConstructorParameters<typeof Item>;
          state.lastItem = new Item(...itemParams);
          state.lastItem.rawStats = { ...state.stats };
          state.stats.PIU = [0,0,0,0,0,0,0,0];
          state.stats.DIU = [0,0,0,0,0,0,0,0];
          state.items.set(programState.id, state.lastItem);
        }
        if (fnCall.callee.type === "Identifier" && fnCall.callee.name === "allClearKrinItem"){
          state.stats = {
            HealthUP : 0,
            StrengthUP : 0,
            MagicUP : 0,
            SpeedUP : 0,
            FocusUP : 0,
            PIU : [0,0,0,0,0,0,0,0],
            DIU : [0,0,0,0,0,0,0,0],
          };
        }
        
      },
      AssignmentExpression(assignment, state) {
        let left = assignment.left;
        let right = assignment.right;
        simple(left, {
          Identifier(identifier, state) {
            //itemKrinIDnow = 0;
            if (identifier.name === "itemKrinIDnow"){
              let value = 0;
              if (right.type === "UnaryExpression"){
                value = Number(right.operator + ((right.argument as Literal).value))
              } else {
                value = (right as Literal).value as number;
              }
              state.id = value;
            }
          },
          MemberExpression(member, state) {
            simple(member.object, {
              Identifier(node, state) {
                //gghhjjuu.looks = "NINJA";
                if (node.name === "gghhjjuu"){
                  state.lastItem!.appearance = (right as Literal).value as string;
                }
                //Krin.HealthUP = 0;
                if (node.name === "Krin"){
                  const propertyName = (member.property as Identifier).name as "HealthUP" | "StrengthUP" | "MagicUP" | "SpeedUP" | "FocusUP";
                  if (["HealthUP", "StrengthUP", "MagicUP", "SpeedUP", "FocusUP"].includes(propertyName)){
                    state.stats[propertyName] = (right as Literal).value as number;
                  }
                  
                }
              },
              //Krin.PIU[0] = 0;
              MemberExpression(node, state) {
                if (node.object.type === "Identifier" && node.object.name === "Krin"){
                  const propertyName = (node.property as Identifier).name as "PIU" | "DIU";
                  const arrayIndex = (member.property as Literal).value as number;
                  if (["PIU", "DIU"].includes(propertyName)){
                    state.stats[propertyName][arrayIndex] = (right as Literal).value as number;
                  }
                }
              }
            }, undefined, state);
          }
        }, undefined, state);
        if (left.type === "MemberExpression" && left.object.type === "Identifier"){
          left.object
        }
      }
    }, undefined, programState);
    return this.itemList;
  }
  
}
