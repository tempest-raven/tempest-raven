if(!_global.mx)
{
   _global.mx = new Object();
}
§§pop();
if(!_global.mx.core)
{
   _global.mx.core = new Object();
}
§§pop();
if(!_global.mx.core.UIObject)
{
   mx.core.UIObject.prototype = new MovieClip().__get__width = function()
   {
      return this._width;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__height = function()
   {
      return this._height;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__left = function()
   {
      return this._x;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__x = function()
   {
      return this._x;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__top = function()
   {
      return this._y;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__y = function()
   {
      return this._y;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__right = function()
   {
      return this._parent.width - (this._x + this.__get__width());
   };
   mx.core.UIObject.prototype = new MovieClip().__get__bottom = function()
   {
      return this._parent.height - (this._y + this.__get__height());
   };
   mx.core.UIObject.prototype = new MovieClip().getMinHeight = function(Void)
   {
      return this._minHeight;
   };
   mx.core.UIObject.prototype = new MovieClip().setMinHeight = function(h)
   {
      this._minHeight = h;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__minHeight = function()
   {
      return this.getMinHeight();
   };
   mx.core.UIObject.prototype = new MovieClip().__set__minHeight = function(h)
   {
      this.setMinHeight(h);
      return this.__get__minHeight();
   };
   mx.core.UIObject.prototype = new MovieClip().getMinWidth = function(Void)
   {
      return this._minWidth;
   };
   mx.core.UIObject.prototype = new MovieClip().setMinWidth = function(w)
   {
      this._minWidth = w;
   };
   mx.core.UIObject.prototype = new MovieClip().__get__minWidth = function()
   {
      return this.getMinWidth();
   };
   mx.core.UIObject.prototype = new MovieClip().__set__minWidth = function(w)
   {
      this.setMinWidth(w);
      return this.__get__minWidth();
   };
   mx.core.UIObject.prototype = new MovieClip().setVisible = function(x, noEvent)
   {
      if(x != this._visible)
      {
         this._visible = x;
         if(noEvent != true)
         {
            this.dispatchEvent({type:(!x ? "hide" : "reveal")});
         }
      }
   };
   mx.core.UIObject.prototype = new MovieClip().__get__visible = function()
   {
      return this._visible;
   };
   mx.core.UIObject.prototype = new MovieClip().__set__visible = function(x)
   {
      this.setVisible(x,false);
      return this.__get__visible();
   };
   mx.core.UIObject.prototype = new MovieClip().__get__scaleX = function()
   {
      return this._xscale;
   };
   mx.core.UIObject.prototype = new MovieClip().__set__scaleX = function(x)
   {
      this._xscale = x;
      return this.__get__scaleX();
   };
   mx.core.UIObject.prototype = new MovieClip().__get__scaleY = function()
   {
      return this._yscale;
   };
   mx.core.UIObject.prototype = new MovieClip().__set__scaleY = function(y)
   {
      this._yscale = y;
      return this.__get__scaleY();
   };
   mx.core.UIObject.prototype = new MovieClip().doLater = function(obj, fn)
   {
      if(this.methodTable == undefined)
      {
         this.methodTable = new Array();
      }
      this.methodTable.push({obj:obj,fn:fn});
      this.onEnterFrame = this.doLaterDispatcher;
   };
   mx.core.UIObject.prototype = new MovieClip().doLaterDispatcher = function(Void)
   {
      delete this.onEnterFrame;
      if(this.invalidateFlag)
      {
         this.redraw();
      }
      var _loc3_ = this.methodTable;
      this.methodTable = new Array();
      if(_loc3_.length > 0)
      {
         var _loc2_ = undefined;
         while((_loc2_ = _loc3_.shift()) != undefined)
         {
            _loc2_.obj[_loc2_.fn]();
         }
      }
   };
   mx.core.UIObject.prototype = new MovieClip().cancelAllDoLaters = function(Void)
   {
      delete this.onEnterFrame;
      this.methodTable = new Array();
   };
   mx.core.UIObject.prototype = new MovieClip().invalidate = function(Void)
   {
      this.invalidateFlag = true;
      this.onEnterFrame = this.doLaterDispatcher;
   };
   mx.core.UIObject.prototype = new MovieClip().invalidateStyle = function(Void)
   {
      this.invalidate();
   };
   mx.core.UIObject.prototype = new MovieClip().redraw = function(bAlways)
   {
      if(this.invalidateFlag || bAlways)
      {
         this.invalidateFlag = false;
         var _loc2_ = undefined;
         for(_loc2_ in this.tfList)
         {
            this.tfList[_loc2_].draw();
         }
         this.draw();
         this.dispatchEvent({type:"draw"});
      }
   };
   mx.core.UIObject.prototype = new MovieClip().draw = function(Void)
   {
   };
   mx.core.UIObject.prototype = new MovieClip().move = function(x, y, noEvent)
   {
      var _loc3_ = this._x;
      var _loc2_ = this._y;
      this._x = x;
      this._y = y;
      if(noEvent != true)
      {
         this.dispatchEvent({type:"move",oldX:_loc3_,oldY:_loc2_});
      }
   };
   mx.core.UIObject.prototype = new MovieClip().setSize = function(w, h, noEvent)
   {
      var _loc2_ = this.__width;
      var _loc3_ = this.__height;
      this.__width = w;
      this.__height = h;
      this.size();
      if(noEvent != true)
      {
         this.dispatchEvent({type:"resize",oldWidth:_loc2_,oldHeight:_loc3_});
      }
   };
   mx.core.UIObject.prototype = new MovieClip().size = function(Void)
   {
      this._width = this.__width;
      this._height = this.__height;
   };
   mx.core.UIObject.prototype = new MovieClip().drawRect = function(x1, y1, x2, y2)
   {
      this.moveTo(x1,y1);
      this.lineTo(x2,y1);
      this.lineTo(x2,y2);
      this.lineTo(x1,y2);
      this.lineTo(x1,y1);
   };
   mx.core.UIObject.prototype = new MovieClip().createLabel = function(name, depth, text)
   {
      this.createTextField(name,depth,0,0,0,0);
      var _loc2_ = this[name];
      _loc2_._color = mx.core.UIObject.textColorList;
      _loc2_._visible = false;
      _loc2_.__text = text;
      if(this.tfList == undefined)
      {
         this.tfList = new Object();
      }
      this.tfList[name] = _loc2_;
      _loc2_.invalidateStyle();
      this.invalidate();
      _loc2_.styleName = this;
      return _loc2_;
   };
   mx.core.UIObject.prototype = new MovieClip().createObject = function(linkageName, id, depth, initobj)
   {
      return this.attachMovie(linkageName,id,depth,initobj);
   };
   mx.core.UIObject.prototype = new MovieClip().createClassObject = function(className, id, depth, initobj)
   {
      var _loc3_ = className.symbolName == undefined;
      if(_loc3_)
      {
         Object.registerClass(className.symbolOwner.symbolName,className);
      }
      var _loc4_ = this.createObject(className.symbolOwner.symbolName,id,depth,initobj);
      if(_loc3_)
      {
         Object.registerClass(className.symbolOwner.symbolName,className.symbolOwner);
      }
      return _loc4_;
   };
   mx.core.UIObject.prototype = new MovieClip().createEmptyObject = function(id, depth)
   {
      return this.createClassObject(mx.core.UIObject,id,depth);
   };
   mx.core.UIObject.prototype = new MovieClip().destroyObject = function(id)
   {
      var _loc2_ = this[id];
      if(_loc2_.getDepth() < 0)
      {
         var _loc4_ = this.buildDepthTable();
         var _loc5_ = this.findNextAvailableDepth(0,_loc4_,"up");
         var _loc3_ = _loc5_;
         _loc2_.swapDepths(_loc3_);
      }
      _loc2_.removeMovieClip();
      delete this[id];
   };
   mx.core.UIObject.prototype = new MovieClip().getSkinIDName = function(tag)
   {
      return this.idNames[tag];
   };
   mx.core.UIObject.prototype = new MovieClip().setSkin = function(tag, linkageName, initObj)
   {
      if(_global.skinRegistry[linkageName] == undefined)
      {
         mx.skins.SkinElement.registerElement(linkageName,mx.skins.SkinElement);
      }
      return this.createObject(linkageName,this.getSkinIDName(tag),tag,initObj);
   };
   mx.core.UIObject.prototype = new MovieClip().createSkin = function(tag)
   {
      var _loc2_ = this.getSkinIDName(tag);
      this.createEmptyObject(_loc2_,tag);
      return this[_loc2_];
   };
   mx.core.UIObject.prototype = new MovieClip().createChildren = function(Void)
   {
   };
   mx.core.UIObject.prototype = new MovieClip()._createChildren = function(Void)
   {
      this.createChildren();
      this.childrenCreated = true;
   };
   mx.core.UIObject.prototype = new MovieClip().constructObject = function(Void)
   {
      if(this._name == undefined)
      {
         return undefined;
      }
      this.init();
      this._createChildren();
      this.createAccessibilityImplementation();
      this._endInit();
      if(this.validateNow)
      {
         this.redraw(true);
      }
      else
      {
         this.invalidate();
      }
   };
   mx.core.UIObject.prototype = new MovieClip().initFromClipParameters = function(Void)
   {
      var _loc4_ = false;
      var _loc2_ = undefined;
      for(_loc2_ in this.clipParameters)
      {
         if(this.hasOwnProperty(_loc2_))
         {
            _loc4_ = true;
            this["def_" + _loc2_] = this[_loc2_];
            delete this[_loc2_];
         }
      }
      if(_loc4_)
      {
         for(_loc2_ in this.clipParameters)
         {
            var _loc3_ = this["def_" + _loc2_];
            if(_loc3_ != undefined)
            {
               this[_loc2_] = _loc3_;
            }
         }
      }
   };
   mx.core.UIObject.prototype = new MovieClip().init = function(Void)
   {
      this.__width = this._width;
      this.__height = this._height;
      if(this.initProperties == undefined)
      {
         this.initFromClipParameters();
      }
      else
      {
         this.initProperties();
      }
      if(_global.cascadingStyles == true)
      {
         this.stylecache = new Object();
      }
   };
   mx.core.UIObject.prototype = new MovieClip().getClassStyleDeclaration = function(Void)
   {
      var _loc4_ = this;
      var _loc3_ = this.className;
      while(_loc3_ != undefined)
      {
         if(this.ignoreClassStyleDeclaration[_loc3_] == undefined)
         {
            if(_global.styles[_loc3_] != undefined)
            {
               return _global.styles[_loc3_];
            }
         }
         _loc4_ = _loc4_.__proto__;
         _loc3_ = _loc4_.className;
      }
   };
   mx.core.UIObject.prototype = new MovieClip().setColor = function(color)
   {
   };
   mx.core.UIObject.prototype = new MovieClip().__getTextFormat = function(tf, bAll)
   {
      var _loc8_ = this.stylecache.tf;
      if(_loc8_ != undefined)
      {
         var _loc3_ = undefined;
         for(_loc3_ in mx.styles.StyleManager.TextFormatStyleProps)
         {
            if(bAll || mx.styles.StyleManager.TextFormatStyleProps[_loc3_])
            {
               if(tf[_loc3_] == undefined)
               {
                  tf[_loc3_] = _loc8_[_loc3_];
               }
            }
         }
         return false;
      }
      var _loc6_ = false;
      for(_loc3_ in mx.styles.StyleManager.TextFormatStyleProps)
      {
         if(bAll || mx.styles.StyleManager.TextFormatStyleProps[_loc3_])
         {
            if(tf[_loc3_] == undefined)
            {
               var _loc5_ = this._tf[_loc3_];
               if(_loc5_ != undefined)
               {
                  tf[_loc3_] = _loc5_;
               }
               else if(_loc3_ == "font" && this.fontFamily != undefined)
               {
                  tf[_loc3_] = this.fontFamily;
               }
               else if(_loc3_ == "size" && this.fontSize != undefined)
               {
                  tf[_loc3_] = this.fontSize;
               }
               else if(_loc3_ == "color" && this.color != undefined)
               {
                  tf[_loc3_] = this.color;
               }
               else if(_loc3_ == "leftMargin" && this.marginLeft != undefined)
               {
                  tf[_loc3_] = this.marginLeft;
               }
               else if(_loc3_ == "rightMargin" && this.marginRight != undefined)
               {
                  tf[_loc3_] = this.marginRight;
               }
               else if(_loc3_ == "italic" && this.fontStyle != undefined)
               {
                  tf[_loc3_] = this.fontStyle == _loc3_;
               }
               else if(_loc3_ == "bold" && this.fontWeight != undefined)
               {
                  tf[_loc3_] = this.fontWeight == _loc3_;
               }
               else if(_loc3_ == "align" && this.textAlign != undefined)
               {
                  tf[_loc3_] = this.textAlign;
               }
               else if(_loc3_ == "indent" && this.textIndent != undefined)
               {
                  tf[_loc3_] = this.textIndent;
               }
               else if(_loc3_ == "underline" && this.textDecoration != undefined)
               {
                  tf[_loc3_] = this.textDecoration == _loc3_;
               }
               else if(_loc3_ == "embedFonts" && this.embedFonts != undefined)
               {
                  tf[_loc3_] = this.embedFonts;
               }
               else
               {
                  _loc6_ = true;
               }
            }
         }
      }
      if(_loc6_)
      {
         var _loc9_ = this.styleName;
         if(_loc9_ != undefined)
         {
            if(typeof _loc9_ != "string")
            {
               _loc6_ = _loc9_.__getTextFormat(tf,true,this);
            }
            else if(_global.styles[_loc9_] != undefined)
            {
               _loc6_ = _global.styles[_loc9_].__getTextFormat(tf,true,this);
            }
         }
      }
      if(_loc6_)
      {
         var _loc10_ = this.getClassStyleDeclaration();
         if(_loc10_ != undefined)
         {
            _loc6_ = _loc10_.__getTextFormat(tf,true,this);
         }
      }
      if(_loc6_)
      {
         if(_global.cascadingStyles)
         {
            if(this._parent != undefined)
            {
               _loc6_ = this._parent.__getTextFormat(tf,false);
            }
         }
      }
      if(_loc6_)
      {
         _loc6_ = _global.style.__getTextFormat(tf,true,this);
      }
      return _loc6_;
   };
   mx.core.UIObject.prototype = new MovieClip()._getTextFormat = function(Void)
   {
      var _loc2_ = this.stylecache.tf;
      if(_loc2_ != undefined)
      {
         return _loc2_;
      }
      _loc2_ = new TextFormat();
      this.__getTextFormat(_loc2_,true);
      this.stylecache.tf = _loc2_;
      if(this.enabled == false)
      {
         var _loc3_ = this.getStyle("disabledColor");
         _loc2_.color = _loc3_;
      }
      return _loc2_;
   };
   mx.core.UIObject.prototype = new MovieClip().getStyleName = function(Void)
   {
      var _loc2_ = this.styleName;
      if(_loc2_ != undefined)
      {
         if(typeof _loc2_ != "string")
         {
            return _loc2_.getStyleName();
         }
         return _loc2_;
      }
      if(this._parent != undefined)
      {
         return this._parent.getStyleName();
      }
      return undefined;
   };
   mx.core.UIObject.prototype = new MovieClip().getStyle = function(styleProp)
   {
      var _loc3_ = undefined;
      _global.getStyleCounter = _global.getStyleCounter + 1;
      if(this[styleProp] != undefined)
      {
         return this[styleProp];
      }
      var _loc6_ = this.styleName;
      if(_loc6_ != undefined)
      {
         if(typeof _loc6_ != "string")
         {
            _loc3_ = _loc6_.getStyle(styleProp);
         }
         else
         {
            var _loc7_ = _global.styles[_loc6_];
            _loc3_ = _loc7_.getStyle(styleProp);
         }
      }
      if(_loc3_ != undefined)
      {
         return _loc3_;
      }
      _loc7_ = this.getClassStyleDeclaration();
      if(_loc7_ != undefined)
      {
         _loc3_ = _loc7_[styleProp];
      }
      if(_loc3_ != undefined)
      {
         return _loc3_;
      }
      if(_global.cascadingStyles)
      {
         if(mx.styles.StyleManager.isInheritingStyle(styleProp) || mx.styles.StyleManager.isColorStyle(styleProp))
         {
            var _loc5_ = this.stylecache;
            if(_loc5_ != undefined)
            {
               if(_loc5_[styleProp] != undefined)
               {
                  return _loc5_[styleProp];
               }
            }
            if(this._parent != undefined)
            {
               _loc3_ = this._parent.getStyle(styleProp);
            }
            else
            {
               _loc3_ = _global.style[styleProp];
            }
            if(_loc5_ != undefined)
            {
               _loc5_[styleProp] = _loc3_;
            }
            return _loc3_;
         }
      }
      if(_loc3_ == undefined)
      {
         _loc3_ = _global.style[styleProp];
      }
      return _loc3_;
   };
   mx.core.UIObject = function()
   {
      super();
      this.constructObject();
   }.mergeClipParameters = function(o, p)
   {
      for(var _loc3_ in p)
      {
         o[_loc3_] = p[_loc3_];
      }
      return true;
   };
   mx.core.UIObject = function()
   {
      super();
      this.constructObject();
   }.symbolName = "UIObject";
   mx.core.UIObject = function()
   {
      super();
      this.constructObject();
   }.symbolOwner = mx.core.UIObject;
   mx.core.UIObject = function()
   {
      super();
      this.constructObject();
   }.version = "2.0.2.127";
   mx.core.UIObject = function()
   {
      super();
      this.constructObject();
   }.textColorList = {color:1,disabledColor:1};
   mx.core.UIObject.prototype = new MovieClip().invalidateFlag = false;
   mx.core.UIObject.prototype = new MovieClip().lineWidth = 1;
   mx.core.UIObject.prototype = new MovieClip().lineColor = 0;
   mx.core.UIObject.prototype = new MovieClip().tabEnabled = false;
   mx.core.UIObject.prototype = new MovieClip().clipParameters = {visible:1,minHeight:1,minWidth:1,maxHeight:1,maxWidth:1,preferredHeight:1,preferredWidth:1};
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("bottom",mx.core.UIObject.prototype = new MovieClip().__get__bottom,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("height",mx.core.UIObject.prototype = new MovieClip().__get__height,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("left",mx.core.UIObject.prototype = new MovieClip().__get__left,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("minHeight",mx.core.UIObject.prototype = new MovieClip().__get__minHeight,mx.core.UIObject.prototype = new MovieClip().__set__minHeight));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("minWidth",mx.core.UIObject.prototype = new MovieClip().__get__minWidth,mx.core.UIObject.prototype = new MovieClip().__set__minWidth));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("right",mx.core.UIObject.prototype = new MovieClip().__get__right,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("scaleX",mx.core.UIObject.prototype = new MovieClip().__get__scaleX,mx.core.UIObject.prototype = new MovieClip().__set__scaleX));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("scaleY",mx.core.UIObject.prototype = new MovieClip().__get__scaleY,mx.core.UIObject.prototype = new MovieClip().__set__scaleY));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("top",mx.core.UIObject.prototype = new MovieClip().__get__top,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("visible",mx.core.UIObject.prototype = new MovieClip().__get__visible,mx.core.UIObject.prototype = new MovieClip().__set__visible));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("width",mx.core.UIObject.prototype = new MovieClip().__get__width,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("x",mx.core.UIObject.prototype = new MovieClip().__get__x,function()
   {
   }
   ));
   §§push((mx.core.UIObject.prototype = new MovieClip()).addProperty("y",mx.core.UIObject.prototype = new MovieClip().__get__y,function()
   {
   }
   ));
   §§push(ASSetPropFlags(mx.core.UIObject.prototype,null,1));
}
§§pop();
