import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { Buff } from '../buff';
import { BuffService } from '../buff.service';
import { formatPercent } from '@angular/common';
import { RouterLink } from '@angular/router';
import { elementComponent } from '../../shared/types';

@Component({
  selector: 'app-buff',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './buff.component.html',
  styleUrl: './buff.component.css'
})
export class BuffComponent implements elementComponent<string>, OnInit {
  private static identity = (_: any) => _;
  private static toPercent = (v: number) => formatPercent(v, "en-US");
  private static toPercentSigned = (v: number) => (v > 0 ? "+" : "") + BuffComponent.toPercent(v);
  private static scaleFunction = (v: number) => v > 0 ? `${BuffComponent.toPercent(v)} damage` : `${BuffComponent.toPercent(-v)} healing`;
  static _attributeMap: Map<number, [string, (v: number) => number | string | null]> = new Map([
    [3, ["Strength modifier", BuffComponent.toPercentSigned]],
    [5, ["Instinct modifier", BuffComponent.toPercentSigned]],
    [7, ["Speed modifier", BuffComponent.toPercentSigned]],
    [9, ["Health modifier", BuffComponent.toPercentSigned]],
    [10, ["Flat direct damage dealt", BuffComponent.identity]],
    [11, ["Direct damage dealt", BuffComponent.toPercentSigned]],
    [12, ["Flat direct damage taken", BuffComponent.identity]],
    [13, ["Direct damage taken", BuffComponent.toPercentSigned]],
    [14, ["Flat effect over time", (v: number) => v > 0 ? `${v} damage` : `${-v} healing`]],
    [15, ["Focus granted", (v: number) => -v]],
    [16, ["Duration", (v: number) => v > 0 ? `${v} turn(s)` : "Passive"]], //mandatory
    [17, ["Stunned", (_: any) => null]],
    [19, ["Flat shield", BuffComponent.identity]],
    //[20, ["Buff or debuff", v => v === 1 ? "buff" : "debuff"]],
    [23, ["Element piercing", BuffComponent.toPercentSigned]],
    [24, ["Element defence", BuffComponent.toPercentSigned]],
    //Skip 25
    [26, ["Subversion", (_: any) => "Swaps healing and damage"]],
    [27, ["Unstackable", (_: any) => null]],
    [28, ["Strength scale", BuffComponent.scaleFunction]],
    [29, ["Instinct scale", BuffComponent.scaleFunction]],
    [30, ["Speed scale", BuffComponent.scaleFunction]],
    [31, ["Apply visual effect", BuffComponent.identity]], //TODO: list them
    [32, ["Dispel resistance", BuffComponent.toPercent]],
    [33, ["Health scale", BuffComponent.scaleFunction]],
    [35, ["Healing received", BuffComponent.toPercentSigned]],
    [36, ["Healing received reduction", BuffComponent.toPercent]],
    [37, ["Healing done", BuffComponent.toPercentSigned]],
    [38, ["Shield strength scale", BuffComponent.toPercent]],
    [39, ["Shield instinct scale", BuffComponent.toPercent]],
    [40, ["Shield speed scale", BuffComponent.toPercent]],
    [41, ["Shield health scale", BuffComponent.toPercent]],
    [42, ["Target's strength scale", BuffComponent.toPercent]],
    [43, ["Target's instinct scale", BuffComponent.toPercent]],
    [44, ["Target's speed scale", BuffComponent.toPercent]],
    [45, ["Target's health scale", BuffComponent.scaleFunction]],
    [46, ["Periodic damage taken", BuffComponent.toPercentSigned]],
    [47, ["Periodic healing received", BuffComponent.toPercentSigned]],
    [48, ["Periodic damage done", BuffComponent.toPercentSigned]],
    [49, ["Maximum focus", BuffComponent.identity]],
    [50, ["Silenced", (_: any) => null]],
  ]);

  @Input({required: true}) elementId: string = "";
  @Input({transform: booleanAttribute}) addLink: boolean = false;
  public attributeMap = BuffComponent._attributeMap;
  public buff: Buff | undefined;

  constructor(private buffService: BuffService){}

  ngOnInit(){
    this.buffService.request.then(response => this.buff = response.get(this.elementId));
  }
}
