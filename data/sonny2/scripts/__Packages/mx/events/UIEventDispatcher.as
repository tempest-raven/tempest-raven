if(!_global.mx)
{
   _global.mx = new Object();
}
§§pop();
if(!_global.mx.events)
{
   _global.mx.events = new Object();
}
§§pop();
if(!_global.mx.events.UIEventDispatcher)
{
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.addKeyEvents = function(obj)
   {
      if(obj.keyHandler == undefined)
      {
         var _loc0_ = null;
         var _loc1_ = obj.keyHandler = new Object();
         _loc1_.owner = obj;
         _loc1_.onKeyDown = mx.events.UIEventDispatcher._fEventDispatcher.onKeyDown;
         _loc1_.onKeyUp = mx.events.UIEventDispatcher._fEventDispatcher.onKeyUp;
      }
      Key.addListener(obj.keyHandler);
   };
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.removeKeyEvents = function(obj)
   {
      Key.removeListener(obj.keyHandler);
   };
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.addLoadEvents = function(obj)
   {
      if(obj.onLoad == undefined)
      {
         obj.onLoad = mx.events.UIEventDispatcher._fEventDispatcher.onLoad;
         obj.onUnload = mx.events.UIEventDispatcher._fEventDispatcher.onUnload;
         if(obj.getBytesTotal() == obj.getBytesLoaded())
         {
            obj.doLater(obj,"onLoad");
         }
      }
   };
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.removeLoadEvents = function(obj)
   {
      delete obj.onLoad;
      delete obj.onUnload;
   };
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.initialize = function(obj)
   {
      if(mx.events.UIEventDispatcher._fEventDispatcher == undefined)
      {
         mx.events.UIEventDispatcher._fEventDispatcher = new mx.events.UIEventDispatcher();
      }
      obj.addEventListener = mx.events.UIEventDispatcher._fEventDispatcher.__addEventListener;
      obj.__origAddEventListener = mx.events.UIEventDispatcher._fEventDispatcher.addEventListener;
      obj.removeEventListener = mx.events.UIEventDispatcher._fEventDispatcher.removeEventListener;
      obj.dispatchEvent = mx.events.UIEventDispatcher._fEventDispatcher.dispatchEvent;
      obj.dispatchQueue = mx.events.UIEventDispatcher._fEventDispatcher.dispatchQueue;
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().dispatchEvent = function(eventObj)
   {
      if(eventObj.target == undefined)
      {
         eventObj.target = this;
      }
      this[eventObj.type + "Handler"](eventObj);
      this.dispatchQueue(mx.events.EventDispatcher,eventObj);
      this.dispatchQueue(this,eventObj);
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().onKeyDown = function(Void)
   {
      this.owner.dispatchEvent({type:"keyDown",code:Key.getCode(),ascii:Key.getAscii(),shiftKey:Key.isDown(16),ctrlKey:Key.isDown(17)});
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().onKeyUp = function(Void)
   {
      this.owner.dispatchEvent({type:"keyUp",code:Key.getCode(),ascii:Key.getAscii(),shiftKey:Key.isDown(16),ctrlKey:Key.isDown(17)});
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().onLoad = function(Void)
   {
      if(this.__sentLoadEvent != true)
      {
         this.dispatchEvent({type:"load"});
      }
      this.__sentLoadEvent = true;
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().onUnload = function(Void)
   {
      this.dispatchEvent({type:"unload"});
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().__addEventListener = function(event, handler)
   {
      this.__origAddEventListener(event,handler);
      var _loc3_ = mx.events.UIEventDispatcher.lowLevelEvents;
      for(var _loc5_ in _loc3_)
      {
         if(mx.events.UIEventDispatcher[_loc5_][event] != undefined)
         {
            var _loc2_ = _loc3_[_loc5_][0];
            mx.events.UIEventDispatcher._loc2_(this);
         }
      }
   };
   mx.events.UIEventDispatcher.prototype = new mx.events.EventDispatcher().removeEventListener = function(event, handler)
   {
      var _loc6_ = "__q_" + event;
      mx.events.EventDispatcher._removeEventListener(this[_loc6_],event,handler);
      if(this[_loc6_].length == 0)
      {
         var _loc2_ = mx.events.UIEventDispatcher.lowLevelEvents;
         for(var _loc5_ in _loc2_)
         {
            if(mx.events.UIEventDispatcher[_loc5_][event] != undefined)
            {
               var _loc3_ = _loc2_[_loc5_][1];
               mx.events.UIEventDispatcher[_loc2_[_loc5_][1]](this);
            }
         }
      }
   };
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.keyEvents = {keyDown:1,keyUp:1};
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.loadEvents = {load:1,unload:1};
   mx.events.UIEventDispatcher = function()
   {
      super();
   }.lowLevelEvents = {keyEvents:["addKeyEvents","removeKeyEvents"],loadEvents:["addLoadEvents","removeLoadEvents"]};
   mx.events.UIEventDispatcher = function()
   {
      super();
   }._fEventDispatcher = undefined;
   §§push(ASSetPropFlags(mx.events.UIEventDispatcher.prototype,null,1));
}
§§pop();
