const Restaurant = require('./Restaurant')
const Menu = require('./Menu')
const Item = require('./Item')

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Item.belongsToMany(Menu, {through: "item-menu"});
Menu.belongsToMany(Item, {through: "item-menu"});


module.exports = {Item, Menu, Restaurant};