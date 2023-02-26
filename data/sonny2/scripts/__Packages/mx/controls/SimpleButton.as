if(!_global.mx)
{
   _global.mx = new Object();
}
§§pop();
if(!_global.mx.controls)
{
   _global.mx.controls = new Object();
}
§§pop();
if(!_global.mx.controls.SimpleButton)
{
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().init = function(Void)
   {
      super.init();
      if(this.preset == undefined)
      {
         this.boundingBox_mc._visible = false;
         this.boundingBox_mc._width = this.boundingBox_mc._height = 0;
      }
      this.useHandCursor = false;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().createChildren = function(Void)
   {
      if(this.preset != undefined)
      {
         var _loc2_ = this[this.idNames[this.preset]];
         this[this.refNames[this.preset]] = _loc2_;
         this.skinName = _loc2_;
         if(this.falseOverSkin.length == 0)
         {
            this.rolloverSkin = this.fus;
         }
         if(this.falseOverIcon.length == 0)
         {
            this.rolloverIcon = this.fui;
         }
         this.initializing = false;
      }
      else if(this.__state == true)
      {
         this.setStateVar(true);
      }
      else
      {
         if(this.falseOverSkin.length == 0)
         {
            this.rolloverSkin = this.fus;
         }
         if(this.falseOverIcon.length == 0)
         {
            this.rolloverIcon = this.fui;
         }
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setIcon = function(tag, linkageName)
   {
      return this.setSkin(tag + 8,linkageName);
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().changeIcon = function(tag, linkageName)
   {
      this.linkLength = linkageName.length;
      var _loc2_ = this.stateNames[tag] + "Icon";
      this[_loc2_] = linkageName;
      this[this.idNames[tag + 8]] = _loc2_;
      this.setStateVar(this.getState());
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().changeSkin = function(tag, linkageName)
   {
      var _loc2_ = this.stateNames[tag] + "Skin";
      this[_loc2_] = linkageName;
      this[this.idNames[tag]] = _loc2_;
      this.setStateVar(this.getState());
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().viewIcon = function(varName)
   {
      var _loc4_ = varName + "Icon";
      var _loc3_ = this[_loc4_];
      if(typeof _loc3_ == "string")
      {
         var _loc5_ = _loc3_;
         if(this.__emphasized)
         {
            if(this[_loc3_ + "Emphasized"].length > 0)
            {
               _loc3_ += "Emphasized";
            }
         }
         if(this[_loc3_].length == 0)
         {
            return undefined;
         }
         _loc3_ = this.setIcon(this.tagMap[_loc5_],this[_loc3_]);
         if(_loc3_ == undefined && _global.isLivePreview)
         {
            _loc3_ = this.setIcon(0,"ButtonIcon");
         }
         this[_loc4_] = _loc3_;
      }
      this.iconName._visible = false;
      this.iconName = _loc3_;
      this.iconName._visible = true;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().removeIcons = function()
   {
      var _loc3_ = 0;
      while(_loc3_ < 2)
      {
         var _loc2_ = 8;
         while(_loc2_ < 16)
         {
            this.destroyObject(this.idNames[_loc2_]);
            this[this.stateNames[_loc2_ - 8] + "Icon"] = "";
            _loc2_ = _loc2_ + 1;
         }
         _loc3_ = _loc3_ + 1;
      }
      this.refresh();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setSkin = function(tag, linkageName, initobj)
   {
      var _loc3_ = super.setSkin(tag,linkageName,initobj == undefined ? {styleName:this} : initobj);
      this.calcSize(tag,_loc3_);
      return _loc3_;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().calcSize = function(Void)
   {
      this.__width = this._width;
      this.__height = this._height;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().viewSkin = function(varName, initObj)
   {
      var _loc3_ = varName + "Skin";
      var _loc2_ = this[_loc3_];
      if(typeof _loc2_ == "string")
      {
         var _loc4_ = _loc2_;
         if(this.__emphasized)
         {
            if(this[_loc2_ + "Emphasized"].length > 0)
            {
               _loc2_ += "Emphasized";
            }
         }
         if(this[_loc2_].length == 0)
         {
            return undefined;
         }
         _loc2_ = this.setSkin(this.tagMap[_loc4_],this[_loc2_],initObj == undefined ? {styleName:this} : initObj);
         this[_loc3_] = _loc2_;
      }
      this.skinName._visible = false;
      this.skinName = _loc2_;
      this.skinName._visible = true;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().showEmphasized = function(e)
   {
      if(e && !this.__emphatic)
      {
         if(mx.controls.SimpleButton.emphasizedStyleDeclaration != undefined)
         {
            this.__emphaticStyleName = this.styleName;
            this.styleName = mx.controls.SimpleButton.emphasizedStyleDeclaration;
         }
         this.__emphatic = true;
      }
      else
      {
         if(this.__emphatic)
         {
            this.styleName = this.__emphaticStyleName;
         }
         this.__emphatic = false;
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().refresh = function(Void)
   {
      var _loc2_ = this.getState();
      if(this.enabled == false)
      {
         this.viewIcon("disabled");
         this.viewSkin("disabled");
      }
      else
      {
         this.viewSkin(this.phase);
         this.viewIcon(this.phase);
      }
      this.setView(this.phase == "down");
      this.iconName.enabled = this.enabled;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setView = function(offset)
   {
      if(this.iconName == undefined)
      {
         return undefined;
      }
      var _loc2_ = !offset ? 0 : this.btnOffset;
      this.iconName._x = (this.__width - this.iconName._width) / 2 + _loc2_;
      this.iconName._y = (this.__height - this.iconName._height) / 2 + _loc2_;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setStateVar = function(state)
   {
      if(state)
      {
         if(this.trueOverSkin.length == 0)
         {
            this.rolloverSkin = this.tus;
         }
         else
         {
            this.rolloverSkin = this.trs;
         }
         if(this.trueOverIcon.length == 0)
         {
            this.rolloverIcon = this.tui;
         }
         else
         {
            this.rolloverIcon = this.tri;
         }
         this.upSkin = this.tus;
         this.downSkin = this.tds;
         this.disabledSkin = this.dts;
         this.upIcon = this.tui;
         this.downIcon = this.tdi;
         this.disabledIcon = this.dti;
      }
      else
      {
         if(this.falseOverSkin.length == 0)
         {
            this.rolloverSkin = this.fus;
         }
         else
         {
            this.rolloverSkin = this.frs;
         }
         if(this.falseOverIcon.length == 0)
         {
            this.rolloverIcon = this.fui;
         }
         else
         {
            this.rolloverIcon = this.fri;
         }
         this.upSkin = this.fus;
         this.downSkin = this.fds;
         this.disabledSkin = this.dfs;
         this.upIcon = this.fui;
         this.downIcon = this.fdi;
         this.disabledIcon = this.dfi;
      }
      this.__state = state;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setState = function(state)
   {
      if(state != this.__state)
      {
         this.setStateVar(state);
         this.invalidate();
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().size = function(Void)
   {
      this.refresh();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().draw = function(Void)
   {
      if(this.initializing)
      {
         this.initializing = false;
         this.skinName.visible = true;
         this.iconName.visible = true;
      }
      this.size();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().getState = function(Void)
   {
      return this.__state;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setToggle = function(val)
   {
      this.__toggle = val;
      if(this.__toggle == false)
      {
         this.setState(false);
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().getToggle = function(Void)
   {
      return this.__toggle;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__toggle = function(val)
   {
      this.setToggle(val);
      return this.__get__toggle();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__toggle = function()
   {
      return this.getToggle();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__value = function(val)
   {
      this.setSelected(val);
      return this.__get__value();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__value = function()
   {
      return this.getSelected();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__selected = function(val)
   {
      this.setSelected(val);
      return this.__get__selected();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__selected = function()
   {
      return this.getSelected();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setSelected = function(val)
   {
      if(this.__toggle)
      {
         this.setState(val);
      }
      else
      {
         this.setState(!this.initializing ? this.__state : val);
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().getSelected = function()
   {
      return this.__state;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setEnabled = function(val)
   {
      if(this.enabled != val)
      {
         super.setEnabled(val);
         this.invalidate();
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onPress = function(Void)
   {
      this.pressFocus();
      this.phase = "down";
      this.refresh();
      this.dispatchEvent({type:"buttonDown"});
      if(this.autoRepeat)
      {
         this.interval = setInterval(this,"onPressDelay",this.getStyle("repeatDelay"));
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onPressDelay = function(Void)
   {
      this.dispatchEvent({type:"buttonDown"});
      if(this.autoRepeat)
      {
         clearInterval(this.interval);
         this.interval = setInterval(this,"onPressRepeat",this.getStyle("repeatInterval"));
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onPressRepeat = function(Void)
   {
      this.dispatchEvent({type:"buttonDown"});
      updateAfterEvent();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onRelease = function(Void)
   {
      this.releaseFocus();
      this.phase = "rollover";
      if(this.interval != undefined)
      {
         clearInterval(this.interval);
         delete this.interval;
      }
      if(this.getToggle())
      {
         this.setState(!this.getState());
      }
      else
      {
         this.refresh();
      }
      this.dispatchEvent({type:"click"});
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onDragOut = function(Void)
   {
      this.phase = "up";
      this.refresh();
      this.dispatchEvent({type:"buttonDragOut"});
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onDragOver = function(Void)
   {
      if(this.phase != "up")
      {
         this.onPress();
         return undefined;
      }
      this.phase = "down";
      this.refresh();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onReleaseOutside = function(Void)
   {
      this.releaseFocus();
      this.phase = "up";
      if(this.interval != undefined)
      {
         clearInterval(this.interval);
         delete this.interval;
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onRollOver = function(Void)
   {
      this.phase = "rollover";
      this.refresh();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onRollOut = function(Void)
   {
      this.phase = "up";
      this.refresh();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().getLabel = function(Void)
   {
      return this.fui.text;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().setLabel = function(val)
   {
      if(typeof this.fui == "string")
      {
         this.createLabel("fui",8,val);
         this.fui.styleName = this;
      }
      else
      {
         this.fui.text = val;
      }
      var _loc4_ = this.fui._getTextFormat();
      var _loc2_ = _loc4_.getTextExtent2(val);
      this.fui._width = _loc2_.width + 5;
      this.fui._height = _loc2_.height + 5;
      this.iconName = this.fui;
      this.setView(this.__state);
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__emphasized = function()
   {
      return this.__emphasized;
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__emphasized = function(val)
   {
      this.__emphasized = val;
      var _loc2_ = 0;
      while(_loc2_ < 8)
      {
         this[this.idNames[_loc2_]] = this.stateNames[_loc2_] + "Skin";
         if(typeof this[this.idNames[_loc2_ + 8]] == "movieclip")
         {
            this[this.idNames[_loc2_ + 8]] = this.stateNames[_loc2_] + "Icon";
         }
         _loc2_ = _loc2_ + 1;
      }
      this.showEmphasized(this.__emphasized);
      this.setStateVar(this.__state);
      this.invalidateStyle();
      return this.__get__emphasized();
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().keyDown = function(e)
   {
      if(e.code == 32)
      {
         this.onPress();
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().keyUp = function(e)
   {
      if(e.code == 32)
      {
         this.onRelease();
      }
   };
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().onKillFocus = function(newFocus)
   {
      super.onKillFocus();
      if(this.phase != "up")
      {
         this.phase = "up";
         this.refresh();
      }
   };
   mx.controls.SimpleButton = function()
   {
      super();
   }.symbolName = "SimpleButton";
   mx.controls.SimpleButton = function()
   {
      super();
   }.symbolOwner = mx.controls.SimpleButton;
   mx.controls.SimpleButton = function()
   {
      super();
   }.version = "2.0.2.127";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().className = "SimpleButton";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().style3dInset = 4;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().btnOffset = 1;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__toggle = false;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__state = false;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__emphasized = false;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__emphatic = false;
   mx.controls.SimpleButton = function()
   {
      super();
   }.falseUp = 0;
   mx.controls.SimpleButton = function()
   {
      super();
   }.falseDown = 1;
   mx.controls.SimpleButton = function()
   {
      super();
   }.falseOver = 2;
   mx.controls.SimpleButton = function()
   {
      super();
   }.falseDisabled = 3;
   mx.controls.SimpleButton = function()
   {
      super();
   }.trueUp = 4;
   mx.controls.SimpleButton = function()
   {
      super();
   }.trueDown = 5;
   mx.controls.SimpleButton = function()
   {
      super();
   }.trueOver = 6;
   mx.controls.SimpleButton = function()
   {
      super();
   }.trueDisabled = 7;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseUpSkin = "SimpleButtonUp";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseDownSkin = "SimpleButtonIn";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseOverSkin = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseDisabledSkin = "SimpleButtonUp";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueUpSkin = "SimpleButtonIn";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueDownSkin = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueOverSkin = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueDisabledSkin = "SimpleButtonIn";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseUpIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseDownIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseOverIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().falseDisabledIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueUpIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueDownIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueOverIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trueDisabledIcon = "";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().phase = "up";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().fui = "falseUpIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().fus = "falseUpSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().fdi = "falseDownIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().fds = "falseDownSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().frs = "falseOverSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().fri = "falseOverIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().dfi = "falseDisabledIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().dfs = "falseDisabledSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tui = "trueUpIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tus = "trueUpSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tdi = "trueDownIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tds = "trueDownSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().trs = "trueOverSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tri = "trueOverIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().dts = "trueDisabledSkin";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().dti = "trueDisabledIcon";
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().rolloverSkin = mx.controls.SimpleButton.prototype.frs;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().rolloverIcon = mx.controls.SimpleButton.prototype.fri;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().upSkin = mx.controls.SimpleButton.prototype.fus;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().downSkin = mx.controls.SimpleButton.prototype.fds;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().disabledSkin = mx.controls.SimpleButton.prototype.dfs;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().upIcon = mx.controls.SimpleButton.prototype.fui;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().downIcon = mx.controls.SimpleButton.prototype.fdi;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().disabledIcon = mx.controls.SimpleButton.prototype.dfi;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().initializing = true;
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().idNames = ["fus","fds","frs","dfs","tus","tds","trs","dts","fui","fdi","fri","dfi","tui","tdi","tri","dti"];
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().stateNames = ["falseUp","falseDown","falseOver","falseDisabled","trueUp","trueDown","trueOver","trueDisabled"];
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().refNames = ["upSkin","downSkin","rolloverSkin","disabledSkin"];
   mx.controls.SimpleButton.prototype = new mx.core.UIComponent().tagMap = {falseUpSkin:0,falseDownSkin:1,falseOverSkin:2,falseDisabledSkin:3,trueUpSkin:4,trueDownSkin:5,trueOverSkin:6,trueDisabledSkin:7,falseUpIcon:0,falseDownIcon:1,falseOverIcon:2,falseDisabledIcon:3,trueUpIcon:4,trueDownIcon:5,trueOverIcon:6,trueDisabledIcon:7};
   §§push((mx.controls.SimpleButton.prototype = new mx.core.UIComponent()).addProperty("emphasized",mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__emphasized,mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__emphasized));
   §§push((mx.controls.SimpleButton.prototype = new mx.core.UIComponent()).addProperty("selected",mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__selected,mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__selected));
   §§push((mx.controls.SimpleButton.prototype = new mx.core.UIComponent()).addProperty("toggle",mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__toggle,mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__toggle));
   §§push((mx.controls.SimpleButton.prototype = new mx.core.UIComponent()).addProperty("value",mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__get__value,mx.controls.SimpleButton.prototype = new mx.core.UIComponent().__set__value));
   §§push(ASSetPropFlags(mx.controls.SimpleButton.prototype,null,1));
}
§§pop();
