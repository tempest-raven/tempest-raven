if(!_global.mx)
{
   _global.mx = new Object();
}
§§pop();
if(!_global.mx.skins)
{
   _global.mx.skins = new Object();
}
§§pop();
if(!_global.mx.skins.SkinElement)
{
   mx.skins.SkinElement = function()
   {
      super();
   }.registerElement = function(name, className)
   {
      Object.registerClass(name,className != undefined ? className : mx.skins.SkinElement);
      _global.skinRegistry[name] = true;
   };
   mx.skins.SkinElement.prototype = new MovieClip().__set__visible = function(visible)
   {
      this._visible = visible;
   };
   mx.skins.SkinElement.prototype = new MovieClip().move = function(x, y)
   {
      this._x = x;
      this._y = y;
   };
   mx.skins.SkinElement.prototype = new MovieClip().setSize = function(w, h)
   {
      this._width = w;
      this._height = h;
   };
   §§push(ASSetPropFlags(mx.skins.SkinElement.prototype,null,1));
}
§§pop();
