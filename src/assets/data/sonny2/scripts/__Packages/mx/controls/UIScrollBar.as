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
if(!_global.mx.controls.UIScrollBar)
{
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().init = function(Void)
   {
      super.init();
      this.textField.owner = this;
      this.__set__horizontal(this.wasHorizontal);
      if(this.__get__horizontal())
      {
         this.textField == undefined ? super.setSize(this.__width,this.__height) : super.setSize(this.textField._width,16);
      }
      else
      {
         this.textField == undefined ? super.setSize(this.__width,this.__height) : super.setSize(16,this.textField._height);
      }
      if(this.__get__horizontal())
      {
         var _loc3_ = this.__width;
         this.__height = this.__width;
         this.width = _loc3_;
         this.__width = 16;
      }
      this.textField.onScroller = function()
      {
         this.hPosition = this.hscroll;
         this.vPosition = this.scroll - 1;
      };
      if(this.__get___targetInstanceName() != undefined)
      {
         this.setScrollTarget(this.__get___targetInstanceName());
         this.__get___targetInstanceName().addListener(this);
      }
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get___targetInstanceName = function()
   {
      return this.textField;
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__height = function()
   {
      if(this.wasHorizontal)
      {
         return this.__width;
      }
      return this.__height;
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__width = function()
   {
      if(this.wasHorizontal)
      {
         return this.__height;
      }
      return this.__width;
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().size = function(Void)
   {
      super.size();
      this.onTextChanged();
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().draw = function()
   {
      super.draw();
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__set___targetInstanceName = function(t)
   {
      if(t == undefined)
      {
         this.textField.removeListener(this);
         delete this.textField[!this.__get__horizontal() ? "vScroller" : "hScroller"];
         if(this.textField.hScroller != undefined && this.textField.vScroller != undefined)
         {
            this.textField.unwatch("text");
            this.textField.unwatch("htmltext");
         }
      }
      var _loc3_ = this._parent[t];
      this.textField = this._parent[t];
      this.onTextChanged();
      return this.__get___targetInstanceName();
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().setSize = function(w, h)
   {
      if(this.__get__horizontal())
      {
         super.setSize(h,w);
      }
      else
      {
         super.setSize(w,h);
      }
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().onTextChanged = function(Void)
   {
      if(this.textField == undefined)
      {
         return undefined;
      }
      clearInterval(this.synchScroll);
      if(this.__get__horizontal())
      {
         var _loc2_ = this.textField.hscroll;
         this.setScrollProperties(this.textField._width,0,this.textField.maxhscroll);
         this.__set__scrollPosition(Math.min(_loc2_,this.textField.maxhscroll));
      }
      else
      {
         _loc2_ = this.textField.scroll;
         var _loc3_ = this.textField.bottomScroll - this.textField.scroll;
         this.setScrollProperties(_loc3_,1,this.textField.maxscroll);
         this.__set__scrollPosition(Math.min(_loc2_,this.textField.maxscroll));
      }
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__horizontal = function()
   {
      return this.wasHorizontal;
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__set__horizontal = function(v)
   {
      this.wasHorizontal = v;
      if(v and this.initializing)
      {
         if(this._rotation == 90)
         {
            return undefined;
         }
         this._xscale = -100;
         this._rotation = -90;
      }
      if(!this.initializing)
      {
         if(v)
         {
            if(this._rotation == 0)
            {
               this._rotation = -90;
               this._xscale = -100;
            }
         }
         else if(this._rotation == -90)
         {
            this._rotation = 0;
            this._xscale = 100;
         }
      }
      return this.__get__horizontal();
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().callback = function(prop, oldval, newval)
   {
      clearInterval(this.hScroller.synchScroll);
      clearInterval(this.vScroller.synchScroll);
      this.hScroller.synchScroll = setInterval(this.hScroller,"onTextChanged",50);
      this.vScroller.synchScroll = setInterval(this.vScroller,"onTextChanged",50);
      return newval;
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().setScrollTarget = function(tF)
   {
      if(tF == undefined)
      {
         this.textField.removeListener(this);
         delete this.textField[!this.__get__horizontal() ? "vScroller" : "hScroller"];
         if(this.textField.hScroller != undefined && this.textField.vScroller != undefined)
         {
            this.textField.unwatch("text");
            this.textField.unwatch("htmltext");
         }
      }
      this.textField = undefined;
      if(!(tF instanceof TextField))
      {
         return undefined;
      }
      this.textField = tF;
      if(this.__get__horizontal())
      {
         this.textField.hScroller = this;
         this.textField.hScroller.lineScrollSize = 5;
      }
      else
      {
         this.textField.vScroller = this;
         this.textField.vScroller.lineScrollSize = 1;
      }
      this.onTextChanged();
      this.onChanged = function(Void)
      {
         this.onTextChanged();
      };
      this.onScroller = function(Void)
      {
         if(!this.isScrolling)
         {
            if(!this.horizontal)
            {
               this.scrollPosition = this.textField.scroll;
            }
            else
            {
               this.scrollPosition = this.textField.hscroll;
            }
         }
      };
      this.textField.addListener(this);
      this.textField.watch("text",this.callback);
      this.textField.watch("htmlText",this.callback);
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().scrollHandler = function(Void)
   {
      if(this.__get__horizontal())
      {
         var _loc2_ = this.textField.background;
         this.textField.hscroll = this.scrollPosition;
         this.textField.background = _loc2_;
      }
      else
      {
         this.textField.scroll = this.scrollPosition;
      }
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().setEnabled = function(enable)
   {
      super.setEnabled(enable);
      if(enable)
      {
         this.textField.addListener(this);
      }
      else
      {
         this.textField.removeListener();
      }
   };
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().dispatchScrollEvent = function(detail)
   {
      this.dispatchEvent({type:"scroll"});
   };
   mx.controls.UIScrollBar = function()
   {
      super();
   }.symbolName = "UIScrollBar";
   mx.controls.UIScrollBar = function()
   {
      super();
   }.symbolOwner = mx.controls.UIScrollBar;
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().className = "UIScrollBar";
   mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().clipParameters = {_targetInstanceName:1,horizontal:1};
   mx.controls.UIScrollBar = function()
   {
      super();
   }.mergedClipParameters = mx.core.UIObject.mergeClipParameters(mx.controls.UIScrollBar.prototype.clipParameters);
   mx.controls.UIScrollBar = function()
   {
      super();
   }.version = "2.0.2.127";
   §§push((mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar()).addProperty("_targetInstanceName",mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get___targetInstanceName,mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__set___targetInstanceName));
   §§push((mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar()).addProperty("height",mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__height,function()
   {
   }
   ));
   §§push((mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar()).addProperty("horizontal",mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__horizontal,mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__set__horizontal));
   §§push((mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar()).addProperty("width",mx.controls.UIScrollBar.prototype = new mx.controls.scrollClasses.ScrollBar().__get__width,function()
   {
   }
   ));
   §§push(ASSetPropFlags(mx.controls.UIScrollBar.prototype,null,1));
}
§§pop();
