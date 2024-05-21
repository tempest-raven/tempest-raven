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
if(!_global.mx.core.UIComponent)
{
   mx.core.UIComponent.prototype = new mx.core.UIObject().__get__width = function()
   {
      return this.__width;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().__get__height = function()
   {
      return this.__height;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().setVisible = function(x, noEvent)
   {
      super.setVisible(x,noEvent);
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().enabledChanged = function(id, oldValue, newValue)
   {
      this.setEnabled(newValue);
      this.invalidate();
      delete this.stylecache.tf;
      return newValue;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().setEnabled = function(enabled)
   {
      this.invalidate();
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().getFocus = function()
   {
      var selFocus = Selection.getFocus();
      return selFocus !== null ? eval(selFocus) : null;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().setFocus = function()
   {
      Selection.setFocus(this);
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().getFocusManager = function()
   {
      var _loc2_ = this;
      while(_loc2_ != undefined)
      {
         if(_loc2_.focusManager != undefined)
         {
            return _loc2_.focusManager;
         }
         _loc2_ = _loc2_._parent;
      }
      return undefined;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().onKillFocus = function(newFocus)
   {
      this.removeEventListener("keyDown",this);
      this.removeEventListener("keyUp",this);
      this.dispatchEvent({type:"focusOut"});
      this.drawFocus(false);
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().onSetFocus = function(oldFocus)
   {
      this.addEventListener("keyDown",this);
      this.addEventListener("keyUp",this);
      this.dispatchEvent({type:"focusIn"});
      if(this.getFocusManager().bDrawFocus != false)
      {
         this.drawFocus(true);
      }
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().findFocusInChildren = function(o)
   {
      if(o.focusTextField != undefined)
      {
         return o.focusTextField;
      }
      if(o.tabEnabled == true)
      {
         return o;
      }
      return undefined;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().findFocusFromObject = function(o)
   {
      if(o.tabEnabled != true)
      {
         if(o._parent == undefined)
         {
            return undefined;
         }
         if(o._parent.tabEnabled == true)
         {
            o = o._parent;
         }
         else if(o._parent.tabChildren)
         {
            o = this.findFocusInChildren(o._parent);
         }
         else
         {
            o = this.findFocusFromObject(o._parent);
         }
      }
      return o;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().pressFocus = function()
   {
      var _loc3_ = this.findFocusFromObject(this);
      var _loc2_ = this.getFocus();
      if(_loc3_ != _loc2_)
      {
         _loc2_.drawFocus(false);
         if(this.getFocusManager().bDrawFocus != false)
         {
            _loc3_.drawFocus(true);
         }
      }
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().releaseFocus = function()
   {
      var _loc2_ = this.findFocusFromObject(this);
      if(_loc2_ != this.getFocus())
      {
         _loc2_.setFocus();
      }
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().isParent = function(o)
   {
      while(o != undefined)
      {
         if(o == this)
         {
            return true;
         }
         o = o._parent;
      }
      return false;
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().size = function()
   {
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().init = function()
   {
      super.init();
      this._xscale = 100;
      this._yscale = 100;
      this._focusrect = _global.useFocusRect == false;
      this.watch("enabled",this.enabledChanged);
      if(this.enabled == false)
      {
         this.setEnabled(false);
      }
   };
   mx.core.UIComponent.prototype = new mx.core.UIObject().dispatchValueChangedEvent = function(value)
   {
      this.dispatchEvent({type:"valueChanged",value:value});
   };
   mx.core.UIComponent = function()
   {
      super();
   }.symbolName = "UIComponent";
   mx.core.UIComponent = function()
   {
      super();
   }.symbolOwner = mx.core.UIComponent;
   mx.core.UIComponent = function()
   {
      super();
   }.version = "2.0.2.127";
   mx.core.UIComponent = function()
   {
      super();
   }.kStretch = 5000;
   mx.core.UIComponent.prototype = new mx.core.UIObject().focusEnabled = true;
   mx.core.UIComponent.prototype = new mx.core.UIObject().tabEnabled = true;
   mx.core.UIComponent.prototype = new mx.core.UIObject().origBorderStyles = {themeColor:16711680};
   mx.core.UIComponent.prototype = new mx.core.UIObject().clipParameters = {};
   mx.core.UIComponent = function()
   {
      super();
   }.mergedClipParameters = mx.core.UIObject.mergeClipParameters(mx.core.UIComponent.prototype.clipParameters,mx.core.UIObject.prototype.clipParameters);
   §§push((mx.core.UIComponent.prototype = new mx.core.UIObject()).addProperty("height",mx.core.UIComponent.prototype = new mx.core.UIObject().__get__height,function()
   {
   }
   ));
   §§push((mx.core.UIComponent.prototype = new mx.core.UIObject()).addProperty("width",mx.core.UIComponent.prototype = new mx.core.UIObject().__get__width,function()
   {
   }
   ));
   §§push(ASSetPropFlags(mx.core.UIComponent.prototype,null,1));
}
§§pop();
