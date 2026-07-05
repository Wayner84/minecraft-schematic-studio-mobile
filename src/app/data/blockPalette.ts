export type BlockCategory = 'terrain' | 'wood' | 'stone' | 'glass' | 'colour' | 'nature' | 'redstone' | 'utility' | 'misc';

export type BlockDef = {
  id: string;
  name: string;
  category: BlockCategory;
  color: string;
};

// Generated from minecraft-data 1.21.8 (latest Java data available in minecraft-data 3.111.0).
// Keep air first, then practical starter blocks, then the remaining full-block Java blocks.
export const MINECRAFT_VERSION = '1.21.8';

export const BLOCKS: BlockDef[] = [
  {
    "id": "minecraft:air",
    "name": "Air",
    "category": "misc",
    "color": "#0b0f14"
  },
  {
    "id": "minecraft:stone",
    "name": "Stone",
    "category": "stone",
    "color": "#8b8b8b"
  },
  {
    "id": "minecraft:grass_block",
    "name": "Grass Block",
    "category": "terrain",
    "color": "#4a7c3a"
  },
  {
    "id": "minecraft:dirt",
    "name": "Dirt",
    "category": "terrain",
    "color": "#6b4f2a"
  },
  {
    "id": "minecraft:oak_planks",
    "name": "Oak Planks",
    "category": "wood",
    "color": "#b38b52"
  },
  {
    "id": "minecraft:oak_log",
    "name": "Oak Log",
    "category": "wood",
    "color": "#7f5a34"
  },
  {
    "id": "minecraft:cobblestone",
    "name": "Cobblestone",
    "category": "stone",
    "color": "#7a7a7a"
  },
  {
    "id": "minecraft:glass",
    "name": "Glass",
    "category": "glass",
    "color": "#bfe7ff"
  },
  {
    "id": "minecraft:sand",
    "name": "Sand",
    "category": "terrain",
    "color": "#d7cf8a"
  },
  {
    "id": "minecraft:white_wool",
    "name": "White Wool",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:red_wool",
    "name": "Red Wool",
    "category": "colour",
    "color": "#c43a3a"
  },
  {
    "id": "minecraft:blue_wool",
    "name": "Blue Wool",
    "category": "colour",
    "color": "#2f5fbf"
  },
  {
    "id": "minecraft:black_wool",
    "name": "Black Wool",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:granite",
    "name": "Granite",
    "category": "stone",
    "color": "#9d6b58"
  },
  {
    "id": "minecraft:polished_granite",
    "name": "Polished Granite",
    "category": "stone",
    "color": "#a17060"
  },
  {
    "id": "minecraft:diorite",
    "name": "Diorite",
    "category": "stone",
    "color": "#c8c8c8"
  },
  {
    "id": "minecraft:polished_diorite",
    "name": "Polished Diorite",
    "category": "stone",
    "color": "hsl(203 42% 46%)"
  },
  {
    "id": "minecraft:andesite",
    "name": "Andesite",
    "category": "stone",
    "color": "#8a8f8a"
  },
  {
    "id": "minecraft:polished_andesite",
    "name": "Polished Andesite",
    "category": "stone",
    "color": "hsl(316 42% 46%)"
  },
  {
    "id": "minecraft:coarse_dirt",
    "name": "Coarse Dirt",
    "category": "terrain",
    "color": "#6b4f2a"
  },
  {
    "id": "minecraft:podzol",
    "name": "Podzol",
    "category": "terrain",
    "color": "#5d4526"
  },
  {
    "id": "minecraft:spruce_planks",
    "name": "Spruce Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:birch_planks",
    "name": "Birch Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:jungle_planks",
    "name": "Jungle Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:acacia_planks",
    "name": "Acacia Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:cherry_planks",
    "name": "Cherry Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:dark_oak_planks",
    "name": "Dark Oak Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:pale_oak_wood",
    "name": "Pale Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:pale_oak_planks",
    "name": "Pale Oak Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:mangrove_planks",
    "name": "Mangrove Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:bamboo_planks",
    "name": "Bamboo Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:bamboo_mosaic",
    "name": "Bamboo Mosaic",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:bedrock",
    "name": "Bedrock",
    "category": "utility",
    "color": "hsl(350 42% 46%)"
  },
  {
    "id": "minecraft:suspicious_sand",
    "name": "Suspicious Sand",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:red_sand",
    "name": "Red Sand",
    "category": "terrain",
    "color": "#b76535"
  },
  {
    "id": "minecraft:gravel",
    "name": "Gravel",
    "category": "terrain",
    "color": "hsl(191 42% 46%)"
  },
  {
    "id": "minecraft:suspicious_gravel",
    "name": "Suspicious Gravel",
    "category": "terrain",
    "color": "hsl(193 42% 46%)"
  },
  {
    "id": "minecraft:gold_ore",
    "name": "Gold Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_gold_ore",
    "name": "Deepslate Gold Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:iron_ore",
    "name": "Iron Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_iron_ore",
    "name": "Deepslate Iron Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:coal_ore",
    "name": "Coal Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_coal_ore",
    "name": "Deepslate Coal Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:nether_gold_ore",
    "name": "Nether Gold Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:spruce_log",
    "name": "Spruce Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:birch_log",
    "name": "Birch Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:jungle_log",
    "name": "Jungle Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:acacia_log",
    "name": "Acacia Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:cherry_log",
    "name": "Cherry Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:dark_oak_log",
    "name": "Dark Oak Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:pale_oak_log",
    "name": "Pale Oak Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:mangrove_log",
    "name": "Mangrove Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:mangrove_roots",
    "name": "Mangrove Roots",
    "category": "wood",
    "color": "hsl(331 42% 46%)"
  },
  {
    "id": "minecraft:muddy_mangrove_roots",
    "name": "Muddy Mangrove Roots",
    "category": "wood",
    "color": "#65482e"
  },
  {
    "id": "minecraft:bamboo_block",
    "name": "Block of Bamboo",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_spruce_log",
    "name": "Stripped Spruce Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_birch_log",
    "name": "Stripped Birch Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_jungle_log",
    "name": "Stripped Jungle Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_acacia_log",
    "name": "Stripped Acacia Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_cherry_log",
    "name": "Stripped Cherry Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_dark_oak_log",
    "name": "Stripped Dark Oak Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_pale_oak_log",
    "name": "Stripped Pale Oak Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_oak_log",
    "name": "Stripped Oak Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_mangrove_log",
    "name": "Stripped Mangrove Log",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_bamboo_block",
    "name": "Block of Stripped Bamboo",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:oak_wood",
    "name": "Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:spruce_wood",
    "name": "Spruce Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:birch_wood",
    "name": "Birch Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:jungle_wood",
    "name": "Jungle Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:acacia_wood",
    "name": "Acacia Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:cherry_wood",
    "name": "Cherry Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:dark_oak_wood",
    "name": "Dark Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:mangrove_wood",
    "name": "Mangrove Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_oak_wood",
    "name": "Stripped Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_spruce_wood",
    "name": "Stripped Spruce Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_birch_wood",
    "name": "Stripped Birch Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_jungle_wood",
    "name": "Stripped Jungle Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_acacia_wood",
    "name": "Stripped Acacia Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_cherry_wood",
    "name": "Stripped Cherry Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_dark_oak_wood",
    "name": "Stripped Dark Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_pale_oak_wood",
    "name": "Stripped Pale Oak Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_mangrove_wood",
    "name": "Stripped Mangrove Wood",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:oak_leaves",
    "name": "Oak Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:spruce_leaves",
    "name": "Spruce Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:birch_leaves",
    "name": "Birch Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:jungle_leaves",
    "name": "Jungle Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:acacia_leaves",
    "name": "Acacia Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:cherry_leaves",
    "name": "Cherry Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:dark_oak_leaves",
    "name": "Dark Oak Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:pale_oak_leaves",
    "name": "Pale Oak Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:mangrove_leaves",
    "name": "Mangrove Leaves",
    "category": "wood",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:azalea_leaves",
    "name": "Azalea Leaves",
    "category": "nature",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:flowering_azalea_leaves",
    "name": "Flowering Azalea Leaves",
    "category": "nature",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:sponge",
    "name": "Sponge",
    "category": "misc",
    "color": "hsl(82 42% 46%)"
  },
  {
    "id": "minecraft:wet_sponge",
    "name": "Wet Sponge",
    "category": "misc",
    "color": "hsl(75 42% 46%)"
  },
  {
    "id": "minecraft:lapis_ore",
    "name": "Lapis Lazuli Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_lapis_ore",
    "name": "Deepslate Lapis Lazuli Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:lapis_block",
    "name": "Block of Lapis Lazuli",
    "category": "misc",
    "color": "hsl(275 42% 46%)"
  },
  {
    "id": "minecraft:dispenser",
    "name": "Dispenser",
    "category": "utility",
    "color": "hsl(53 42% 46%)"
  },
  {
    "id": "minecraft:sandstone",
    "name": "Sandstone",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:chiseled_sandstone",
    "name": "Chiseled Sandstone",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:cut_sandstone",
    "name": "Cut Sandstone",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:note_block",
    "name": "Note Block",
    "category": "misc",
    "color": "hsl(200 42% 46%)"
  },
  {
    "id": "minecraft:white_bed",
    "name": "White Bed",
    "category": "utility",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_bed",
    "name": "Orange Bed",
    "category": "utility",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_bed",
    "name": "Magenta Bed",
    "category": "utility",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_bed",
    "name": "Yellow Bed",
    "category": "utility",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_bed",
    "name": "Lime Bed",
    "category": "utility",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_bed",
    "name": "Pink Bed",
    "category": "utility",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_bed",
    "name": "Gray Bed",
    "category": "utility",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_bed",
    "name": "Cyan Bed",
    "category": "utility",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_bed",
    "name": "Purple Bed",
    "category": "utility",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_bed",
    "name": "Blue Bed",
    "category": "utility",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_bed",
    "name": "Brown Bed",
    "category": "utility",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_bed",
    "name": "Green Bed",
    "category": "utility",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_bed",
    "name": "Red Bed",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_bed",
    "name": "Black Bed",
    "category": "utility",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:sticky_piston",
    "name": "Sticky Piston",
    "category": "utility",
    "color": "hsl(151 42% 46%)"
  },
  {
    "id": "minecraft:piston",
    "name": "Piston",
    "category": "utility",
    "color": "hsl(129 42% 46%)"
  },
  {
    "id": "minecraft:orange_wool",
    "name": "Orange Wool",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_wool",
    "name": "Magenta Wool",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_wool",
    "name": "Yellow Wool",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_wool",
    "name": "Lime Wool",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_wool",
    "name": "Pink Wool",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_wool",
    "name": "Gray Wool",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_wool",
    "name": "Cyan Wool",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_wool",
    "name": "Purple Wool",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:brown_wool",
    "name": "Brown Wool",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_wool",
    "name": "Green Wool",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:gold_block",
    "name": "Block of Gold",
    "category": "misc",
    "color": "hsl(22 42% 46%)"
  },
  {
    "id": "minecraft:iron_block",
    "name": "Block of Iron",
    "category": "misc",
    "color": "hsl(326 42% 46%)"
  },
  {
    "id": "minecraft:bricks",
    "name": "Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tnt",
    "name": "TNT",
    "category": "misc",
    "color": "hsl(162 42% 46%)"
  },
  {
    "id": "minecraft:bookshelf",
    "name": "Bookshelf",
    "category": "misc",
    "color": "hsl(217 42% 46%)"
  },
  {
    "id": "minecraft:chiseled_bookshelf",
    "name": "Chiseled Bookshelf",
    "category": "misc",
    "color": "hsl(231 42% 46%)"
  },
  {
    "id": "minecraft:mossy_cobblestone",
    "name": "Mossy Cobblestone",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:obsidian",
    "name": "Obsidian",
    "category": "misc",
    "color": "hsl(19 42% 46%)"
  },
  {
    "id": "minecraft:spawner",
    "name": "Monster Spawner",
    "category": "misc",
    "color": "hsl(24 42% 46%)"
  },
  {
    "id": "minecraft:creaking_heart",
    "name": "Creaking Heart",
    "category": "misc",
    "color": "hsl(353 42% 46%)"
  },
  {
    "id": "minecraft:oak_stairs",
    "name": "Oak Stairs",
    "category": "wood",
    "color": "hsl(304 42% 46%)"
  },
  {
    "id": "minecraft:chest",
    "name": "Chest",
    "category": "utility",
    "color": "hsl(145 42% 46%)"
  },
  {
    "id": "minecraft:diamond_ore",
    "name": "Diamond Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_diamond_ore",
    "name": "Deepslate Diamond Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:diamond_block",
    "name": "Block of Diamond",
    "category": "misc",
    "color": "hsl(138 42% 46%)"
  },
  {
    "id": "minecraft:crafting_table",
    "name": "Crafting Table",
    "category": "utility",
    "color": "hsl(153 42% 46%)"
  },
  {
    "id": "minecraft:farmland",
    "name": "Farmland",
    "category": "terrain",
    "color": "hsl(73 42% 46%)"
  },
  {
    "id": "minecraft:furnace",
    "name": "Furnace",
    "category": "utility",
    "color": "hsl(104 42% 46%)"
  },
  {
    "id": "minecraft:oak_door",
    "name": "Oak Door",
    "category": "wood",
    "color": "hsl(100 42% 46%)"
  },
  {
    "id": "minecraft:ladder",
    "name": "Ladder",
    "category": "utility",
    "color": "hsl(50 42% 46%)"
  },
  {
    "id": "minecraft:cobblestone_stairs",
    "name": "Cobblestone Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:oak_wall_hanging_sign",
    "name": "Oak Hanging Sign",
    "category": "wood",
    "color": "hsl(179 42% 46%)"
  },
  {
    "id": "minecraft:spruce_wall_hanging_sign",
    "name": "Spruce Hanging Sign",
    "category": "wood",
    "color": "hsl(292 42% 46%)"
  },
  {
    "id": "minecraft:birch_wall_hanging_sign",
    "name": "Birch Hanging Sign",
    "category": "wood",
    "color": "hsl(290 42% 46%)"
  },
  {
    "id": "minecraft:acacia_wall_hanging_sign",
    "name": "Acacia Hanging Sign",
    "category": "wood",
    "color": "hsl(62 42% 46%)"
  },
  {
    "id": "minecraft:cherry_wall_hanging_sign",
    "name": "Cherry Hanging Sign",
    "category": "wood",
    "color": "hsl(131 42% 46%)"
  },
  {
    "id": "minecraft:jungle_wall_hanging_sign",
    "name": "Jungle Hanging Sign",
    "category": "wood",
    "color": "hsl(311 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_wall_hanging_sign",
    "name": "Dark Oak Hanging Sign",
    "category": "wood",
    "color": "hsl(146 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_wall_hanging_sign",
    "name": "Pale Oak Hanging Sign",
    "category": "wood",
    "color": "hsl(78 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_wall_hanging_sign",
    "name": "Mangrove Hanging Sign",
    "category": "wood",
    "color": "hsl(67 42% 46%)"
  },
  {
    "id": "minecraft:crimson_wall_hanging_sign",
    "name": "Crimson Hanging Sign",
    "category": "wood",
    "color": "hsl(281 42% 46%)"
  },
  {
    "id": "minecraft:warped_wall_hanging_sign",
    "name": "Warped Hanging Sign",
    "category": "wood",
    "color": "hsl(225 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_wall_hanging_sign",
    "name": "Bamboo Hanging Sign",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:iron_door",
    "name": "Iron Door",
    "category": "utility",
    "color": "hsl(37 42% 46%)"
  },
  {
    "id": "minecraft:redstone_ore",
    "name": "Redstone Ore",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:deepslate_redstone_ore",
    "name": "Deepslate Redstone Ore",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:ice",
    "name": "Ice",
    "category": "glass",
    "color": "#a6ddf6"
  },
  {
    "id": "minecraft:snow_block",
    "name": "Snow Block",
    "category": "terrain",
    "color": "hsl(249 42% 46%)"
  },
  {
    "id": "minecraft:cactus",
    "name": "Cactus",
    "category": "nature",
    "color": "hsl(253 42% 46%)"
  },
  {
    "id": "minecraft:clay",
    "name": "Clay",
    "category": "terrain",
    "color": "hsl(185 42% 46%)"
  },
  {
    "id": "minecraft:jukebox",
    "name": "Jukebox",
    "category": "misc",
    "color": "hsl(78 42% 46%)"
  },
  {
    "id": "minecraft:oak_fence",
    "name": "Oak Fence",
    "category": "wood",
    "color": "hsl(107 42% 46%)"
  },
  {
    "id": "minecraft:netherrack",
    "name": "Netherrack",
    "category": "stone",
    "color": "hsl(167 42% 46%)"
  },
  {
    "id": "minecraft:soul_sand",
    "name": "Soul Sand",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:soul_soil",
    "name": "Soul Soil",
    "category": "misc",
    "color": "hsl(3 42% 46%)"
  },
  {
    "id": "minecraft:basalt",
    "name": "Basalt",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:polished_basalt",
    "name": "Polished Basalt",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:glowstone",
    "name": "Glowstone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:carved_pumpkin",
    "name": "Carved Pumpkin",
    "category": "nature",
    "color": "hsl(106 42% 46%)"
  },
  {
    "id": "minecraft:jack_o_lantern",
    "name": "Jack o'Lantern",
    "category": "utility",
    "color": "hsl(38 42% 46%)"
  },
  {
    "id": "minecraft:cake",
    "name": "Cake",
    "category": "misc",
    "color": "hsl(344 42% 46%)"
  },
  {
    "id": "minecraft:repeater",
    "name": "Redstone Repeater",
    "category": "misc",
    "color": "hsl(240 42% 46%)"
  },
  {
    "id": "minecraft:white_stained_glass",
    "name": "White Stained Glass",
    "category": "glass",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_stained_glass",
    "name": "Orange Stained Glass",
    "category": "glass",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_stained_glass",
    "name": "Magenta Stained Glass",
    "category": "glass",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_stained_glass",
    "name": "Yellow Stained Glass",
    "category": "glass",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_stained_glass",
    "name": "Lime Stained Glass",
    "category": "glass",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_stained_glass",
    "name": "Pink Stained Glass",
    "category": "glass",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_stained_glass",
    "name": "Gray Stained Glass",
    "category": "glass",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_stained_glass",
    "name": "Cyan Stained Glass",
    "category": "glass",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_stained_glass",
    "name": "Purple Stained Glass",
    "category": "glass",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_stained_glass",
    "name": "Blue Stained Glass",
    "category": "glass",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_stained_glass",
    "name": "Brown Stained Glass",
    "category": "glass",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_stained_glass",
    "name": "Green Stained Glass",
    "category": "glass",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_stained_glass",
    "name": "Red Stained Glass",
    "category": "glass",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_stained_glass",
    "name": "Black Stained Glass",
    "category": "glass",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:oak_trapdoor",
    "name": "Oak Trapdoor",
    "category": "wood",
    "color": "hsl(281 42% 46%)"
  },
  {
    "id": "minecraft:spruce_trapdoor",
    "name": "Spruce Trapdoor",
    "category": "wood",
    "color": "hsl(80 42% 46%)"
  },
  {
    "id": "minecraft:birch_trapdoor",
    "name": "Birch Trapdoor",
    "category": "wood",
    "color": "hsl(130 42% 46%)"
  },
  {
    "id": "minecraft:jungle_trapdoor",
    "name": "Jungle Trapdoor",
    "category": "wood",
    "color": "hsl(13 42% 46%)"
  },
  {
    "id": "minecraft:acacia_trapdoor",
    "name": "Acacia Trapdoor",
    "category": "wood",
    "color": "hsl(198 42% 46%)"
  },
  {
    "id": "minecraft:cherry_trapdoor",
    "name": "Cherry Trapdoor",
    "category": "wood",
    "color": "hsl(201 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_trapdoor",
    "name": "Dark Oak Trapdoor",
    "category": "wood",
    "color": "hsl(322 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_trapdoor",
    "name": "Pale Oak Trapdoor",
    "category": "wood",
    "color": "hsl(110 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_trapdoor",
    "name": "Mangrove Trapdoor",
    "category": "wood",
    "color": "hsl(65 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_trapdoor",
    "name": "Bamboo Trapdoor",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stone_bricks",
    "name": "Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mossy_stone_bricks",
    "name": "Mossy Stone Bricks",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:cracked_stone_bricks",
    "name": "Cracked Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:chiseled_stone_bricks",
    "name": "Chiseled Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:packed_mud",
    "name": "Packed Mud",
    "category": "terrain",
    "color": "#65482e"
  },
  {
    "id": "minecraft:mud_bricks",
    "name": "Mud Bricks",
    "category": "terrain",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:infested_stone",
    "name": "Infested Stone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:infested_cobblestone",
    "name": "Infested Cobblestone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:infested_stone_bricks",
    "name": "Infested Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:infested_mossy_stone_bricks",
    "name": "Infested Mossy Stone Bricks",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:infested_cracked_stone_bricks",
    "name": "Infested Cracked Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:infested_chiseled_stone_bricks",
    "name": "Infested Chiseled Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:brown_mushroom_block",
    "name": "Brown Mushroom Block",
    "category": "nature",
    "color": "#79512e"
  },
  {
    "id": "minecraft:red_mushroom_block",
    "name": "Red Mushroom Block",
    "category": "nature",
    "color": "#b73737"
  },
  {
    "id": "minecraft:mushroom_stem",
    "name": "Mushroom Stem",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:iron_bars",
    "name": "Iron Bars",
    "category": "utility",
    "color": "hsl(175 42% 46%)"
  },
  {
    "id": "minecraft:chain",
    "name": "Chain",
    "category": "utility",
    "color": "hsl(305 42% 46%)"
  },
  {
    "id": "minecraft:glass_pane",
    "name": "Glass Pane",
    "category": "glass",
    "color": "#a6ddf6"
  },
  {
    "id": "minecraft:pumpkin",
    "name": "Pumpkin",
    "category": "nature",
    "color": "hsl(344 42% 46%)"
  },
  {
    "id": "minecraft:melon",
    "name": "Melon",
    "category": "nature",
    "color": "hsl(299 42% 46%)"
  },
  {
    "id": "minecraft:oak_fence_gate",
    "name": "Oak Fence Gate",
    "category": "wood",
    "color": "hsl(311 42% 46%)"
  },
  {
    "id": "minecraft:brick_stairs",
    "name": "Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:stone_brick_stairs",
    "name": "Stone Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mud_brick_stairs",
    "name": "Mud Brick Stairs",
    "category": "terrain",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mycelium",
    "name": "Mycelium",
    "category": "terrain",
    "color": "hsl(11 42% 46%)"
  },
  {
    "id": "minecraft:lily_pad",
    "name": "Lily Pad",
    "category": "misc",
    "color": "hsl(342 42% 46%)"
  },
  {
    "id": "minecraft:resin_block",
    "name": "Block of Resin",
    "category": "misc",
    "color": "hsl(27 42% 46%)"
  },
  {
    "id": "minecraft:resin_bricks",
    "name": "Resin Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:resin_brick_stairs",
    "name": "Resin Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:resin_brick_slab",
    "name": "Resin Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:resin_brick_wall",
    "name": "Resin Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:chiseled_resin_bricks",
    "name": "Chiseled Resin Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:nether_bricks",
    "name": "Nether Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:nether_brick_fence",
    "name": "Nether Brick Fence",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:nether_brick_stairs",
    "name": "Nether Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:enchanting_table",
    "name": "Enchanting Table",
    "category": "utility",
    "color": "hsl(120 42% 46%)"
  },
  {
    "id": "minecraft:brewing_stand",
    "name": "Brewing Stand",
    "category": "misc",
    "color": "hsl(111 42% 46%)"
  },
  {
    "id": "minecraft:cauldron",
    "name": "Cauldron",
    "category": "misc",
    "color": "hsl(306 42% 46%)"
  },
  {
    "id": "minecraft:powder_snow_cauldron",
    "name": "Powder Snow Cauldron",
    "category": "terrain",
    "color": "hsl(72 42% 46%)"
  },
  {
    "id": "minecraft:end_stone",
    "name": "End Stone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dragon_egg",
    "name": "Dragon Egg",
    "category": "misc",
    "color": "hsl(81 42% 46%)"
  },
  {
    "id": "minecraft:redstone_lamp",
    "name": "Redstone Lamp",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:cocoa",
    "name": "Cocoa",
    "category": "misc",
    "color": "hsl(337 42% 46%)"
  },
  {
    "id": "minecraft:sandstone_stairs",
    "name": "Sandstone Stairs",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:emerald_ore",
    "name": "Emerald Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_emerald_ore",
    "name": "Deepslate Emerald Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:ender_chest",
    "name": "Ender Chest",
    "category": "utility",
    "color": "hsl(330 42% 46%)"
  },
  {
    "id": "minecraft:emerald_block",
    "name": "Block of Emerald",
    "category": "misc",
    "color": "hsl(114 42% 46%)"
  },
  {
    "id": "minecraft:spruce_stairs",
    "name": "Spruce Stairs",
    "category": "wood",
    "color": "hsl(295 42% 46%)"
  },
  {
    "id": "minecraft:birch_stairs",
    "name": "Birch Stairs",
    "category": "wood",
    "color": "hsl(113 42% 46%)"
  },
  {
    "id": "minecraft:jungle_stairs",
    "name": "Jungle Stairs",
    "category": "wood",
    "color": "hsl(268 42% 46%)"
  },
  {
    "id": "minecraft:beacon",
    "name": "Beacon",
    "category": "misc",
    "color": "hsl(76 42% 46%)"
  },
  {
    "id": "minecraft:cobblestone_wall",
    "name": "Cobblestone Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mossy_cobblestone_wall",
    "name": "Mossy Cobblestone Wall",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:flower_pot",
    "name": "Flower Pot",
    "category": "utility",
    "color": "hsl(289 42% 46%)"
  },
  {
    "id": "minecraft:potted_torchflower",
    "name": "Potted Torchflower",
    "category": "utility",
    "color": "hsl(86 42% 46%)"
  },
  {
    "id": "minecraft:potted_oak_sapling",
    "name": "Potted Oak Sapling",
    "category": "wood",
    "color": "hsl(321 42% 46%)"
  },
  {
    "id": "minecraft:potted_spruce_sapling",
    "name": "Potted Spruce Sapling",
    "category": "wood",
    "color": "hsl(148 42% 46%)"
  },
  {
    "id": "minecraft:potted_birch_sapling",
    "name": "Potted Birch Sapling",
    "category": "wood",
    "color": "hsl(40 42% 46%)"
  },
  {
    "id": "minecraft:potted_jungle_sapling",
    "name": "Potted Jungle Sapling",
    "category": "wood",
    "color": "hsl(247 42% 46%)"
  },
  {
    "id": "minecraft:potted_acacia_sapling",
    "name": "Potted Acacia Sapling",
    "category": "wood",
    "color": "hsl(38 42% 46%)"
  },
  {
    "id": "minecraft:potted_cherry_sapling",
    "name": "Potted Cherry Sapling",
    "category": "wood",
    "color": "hsl(155 42% 46%)"
  },
  {
    "id": "minecraft:potted_dark_oak_sapling",
    "name": "Potted Dark Oak Sapling",
    "category": "wood",
    "color": "hsl(42 42% 46%)"
  },
  {
    "id": "minecraft:potted_pale_oak_sapling",
    "name": "Potted Pale Oak Sapling",
    "category": "wood",
    "color": "hsl(150 42% 46%)"
  },
  {
    "id": "minecraft:potted_mangrove_propagule",
    "name": "Potted Mangrove Propagule",
    "category": "wood",
    "color": "hsl(128 42% 46%)"
  },
  {
    "id": "minecraft:potted_fern",
    "name": "Potted Fern",
    "category": "utility",
    "color": "hsl(220 42% 46%)"
  },
  {
    "id": "minecraft:potted_dandelion",
    "name": "Potted Dandelion",
    "category": "utility",
    "color": "hsl(181 42% 46%)"
  },
  {
    "id": "minecraft:potted_poppy",
    "name": "Potted Poppy",
    "category": "utility",
    "color": "hsl(289 42% 46%)"
  },
  {
    "id": "minecraft:potted_blue_orchid",
    "name": "Potted Blue Orchid",
    "category": "utility",
    "color": "#315db7"
  },
  {
    "id": "minecraft:potted_allium",
    "name": "Potted Allium",
    "category": "utility",
    "color": "hsl(257 42% 46%)"
  },
  {
    "id": "minecraft:potted_azure_bluet",
    "name": "Potted Azure Bluet",
    "category": "utility",
    "color": "#315db7"
  },
  {
    "id": "minecraft:potted_red_tulip",
    "name": "Potted Red Tulip",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:potted_orange_tulip",
    "name": "Potted Orange Tulip",
    "category": "utility",
    "color": "#d98633"
  },
  {
    "id": "minecraft:potted_white_tulip",
    "name": "Potted White Tulip",
    "category": "utility",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:potted_pink_tulip",
    "name": "Potted Pink Tulip",
    "category": "utility",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:potted_oxeye_daisy",
    "name": "Potted Oxeye Daisy",
    "category": "utility",
    "color": "hsl(234 42% 46%)"
  },
  {
    "id": "minecraft:potted_cornflower",
    "name": "Potted Cornflower",
    "category": "utility",
    "color": "hsl(148 42% 46%)"
  },
  {
    "id": "minecraft:potted_lily_of_the_valley",
    "name": "Potted Lily of the Valley",
    "category": "utility",
    "color": "hsl(129 42% 46%)"
  },
  {
    "id": "minecraft:potted_wither_rose",
    "name": "Potted Wither Rose",
    "category": "utility",
    "color": "hsl(290 42% 46%)"
  },
  {
    "id": "minecraft:potted_red_mushroom",
    "name": "Potted Red Mushroom",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:potted_brown_mushroom",
    "name": "Potted Brown Mushroom",
    "category": "utility",
    "color": "#79512e"
  },
  {
    "id": "minecraft:potted_dead_bush",
    "name": "Potted Dead Bush",
    "category": "utility",
    "color": "hsl(98 42% 46%)"
  },
  {
    "id": "minecraft:potted_cactus",
    "name": "Potted Cactus",
    "category": "utility",
    "color": "hsl(166 42% 46%)"
  },
  {
    "id": "minecraft:skeleton_skull",
    "name": "Skeleton Skull",
    "category": "misc",
    "color": "hsl(99 42% 46%)"
  },
  {
    "id": "minecraft:wither_skeleton_skull",
    "name": "Wither Skeleton Skull",
    "category": "misc",
    "color": "hsl(231 42% 46%)"
  },
  {
    "id": "minecraft:zombie_head",
    "name": "Zombie Head",
    "category": "misc",
    "color": "hsl(233 42% 46%)"
  },
  {
    "id": "minecraft:creeper_head",
    "name": "Creeper Head",
    "category": "misc",
    "color": "hsl(89 42% 46%)"
  },
  {
    "id": "minecraft:dragon_head",
    "name": "Dragon Head",
    "category": "misc",
    "color": "hsl(60 42% 46%)"
  },
  {
    "id": "minecraft:piglin_head",
    "name": "Piglin Head",
    "category": "misc",
    "color": "hsl(164 42% 46%)"
  },
  {
    "id": "minecraft:anvil",
    "name": "Anvil",
    "category": "utility",
    "color": "hsl(268 42% 46%)"
  },
  {
    "id": "minecraft:chipped_anvil",
    "name": "Chipped Anvil",
    "category": "utility",
    "color": "hsl(288 42% 46%)"
  },
  {
    "id": "minecraft:damaged_anvil",
    "name": "Damaged Anvil",
    "category": "utility",
    "color": "hsl(122 42% 46%)"
  },
  {
    "id": "minecraft:trapped_chest",
    "name": "Trapped Chest",
    "category": "utility",
    "color": "hsl(196 42% 46%)"
  },
  {
    "id": "minecraft:comparator",
    "name": "Redstone Comparator",
    "category": "misc",
    "color": "hsl(182 42% 46%)"
  },
  {
    "id": "minecraft:redstone_block",
    "name": "Block of Redstone",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:nether_quartz_ore",
    "name": "Nether Quartz Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:hopper",
    "name": "Hopper",
    "category": "utility",
    "color": "hsl(84 42% 46%)"
  },
  {
    "id": "minecraft:quartz_block",
    "name": "Block of Quartz",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:chiseled_quartz_block",
    "name": "Chiseled Quartz Block",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:quartz_pillar",
    "name": "Quartz Pillar",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:quartz_stairs",
    "name": "Quartz Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dropper",
    "name": "Dropper",
    "category": "utility",
    "color": "hsl(278 42% 46%)"
  },
  {
    "id": "minecraft:white_terracotta",
    "name": "White Terracotta",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_terracotta",
    "name": "Orange Terracotta",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_terracotta",
    "name": "Magenta Terracotta",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_terracotta",
    "name": "Yellow Terracotta",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_terracotta",
    "name": "Lime Terracotta",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_terracotta",
    "name": "Pink Terracotta",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_terracotta",
    "name": "Gray Terracotta",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_terracotta",
    "name": "Cyan Terracotta",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_terracotta",
    "name": "Purple Terracotta",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_terracotta",
    "name": "Blue Terracotta",
    "category": "colour",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_terracotta",
    "name": "Brown Terracotta",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_terracotta",
    "name": "Green Terracotta",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_terracotta",
    "name": "Red Terracotta",
    "category": "colour",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_terracotta",
    "name": "Black Terracotta",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:white_stained_glass_pane",
    "name": "White Stained Glass Pane",
    "category": "glass",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_stained_glass_pane",
    "name": "Orange Stained Glass Pane",
    "category": "glass",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_stained_glass_pane",
    "name": "Magenta Stained Glass Pane",
    "category": "glass",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_stained_glass_pane",
    "name": "Yellow Stained Glass Pane",
    "category": "glass",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_stained_glass_pane",
    "name": "Lime Stained Glass Pane",
    "category": "glass",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_stained_glass_pane",
    "name": "Pink Stained Glass Pane",
    "category": "glass",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_stained_glass_pane",
    "name": "Gray Stained Glass Pane",
    "category": "glass",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_stained_glass_pane",
    "name": "Cyan Stained Glass Pane",
    "category": "glass",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_stained_glass_pane",
    "name": "Purple Stained Glass Pane",
    "category": "glass",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_stained_glass_pane",
    "name": "Blue Stained Glass Pane",
    "category": "glass",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_stained_glass_pane",
    "name": "Brown Stained Glass Pane",
    "category": "glass",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_stained_glass_pane",
    "name": "Green Stained Glass Pane",
    "category": "glass",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_stained_glass_pane",
    "name": "Red Stained Glass Pane",
    "category": "glass",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_stained_glass_pane",
    "name": "Black Stained Glass Pane",
    "category": "glass",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:acacia_stairs",
    "name": "Acacia Stairs",
    "category": "wood",
    "color": "hsl(85 42% 46%)"
  },
  {
    "id": "minecraft:cherry_stairs",
    "name": "Cherry Stairs",
    "category": "wood",
    "color": "hsl(144 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_stairs",
    "name": "Dark Oak Stairs",
    "category": "wood",
    "color": "hsl(169 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_stairs",
    "name": "Pale Oak Stairs",
    "category": "wood",
    "color": "hsl(21 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_stairs",
    "name": "Mangrove Stairs",
    "category": "wood",
    "color": "hsl(344 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_stairs",
    "name": "Bamboo Stairs",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:bamboo_mosaic_stairs",
    "name": "Bamboo Mosaic Stairs",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:slime_block",
    "name": "Slime Block",
    "category": "misc",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:iron_trapdoor",
    "name": "Iron Trapdoor",
    "category": "utility",
    "color": "hsl(10 42% 46%)"
  },
  {
    "id": "minecraft:prismarine",
    "name": "Prismarine",
    "category": "stone",
    "color": "hsl(270 42% 46%)"
  },
  {
    "id": "minecraft:prismarine_bricks",
    "name": "Prismarine Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dark_prismarine",
    "name": "Dark Prismarine",
    "category": "stone",
    "color": "hsl(31 42% 46%)"
  },
  {
    "id": "minecraft:prismarine_stairs",
    "name": "Prismarine Stairs",
    "category": "stone",
    "color": "hsl(139 42% 46%)"
  },
  {
    "id": "minecraft:prismarine_brick_stairs",
    "name": "Prismarine Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dark_prismarine_stairs",
    "name": "Dark Prismarine Stairs",
    "category": "stone",
    "color": "hsl(250 42% 46%)"
  },
  {
    "id": "minecraft:prismarine_slab",
    "name": "Prismarine Slab",
    "category": "stone",
    "color": "hsl(19 42% 46%)"
  },
  {
    "id": "minecraft:prismarine_brick_slab",
    "name": "Prismarine Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dark_prismarine_slab",
    "name": "Dark Prismarine Slab",
    "category": "stone",
    "color": "hsl(2 42% 46%)"
  },
  {
    "id": "minecraft:sea_lantern",
    "name": "Sea Lantern",
    "category": "utility",
    "color": "hsl(198 42% 46%)"
  },
  {
    "id": "minecraft:hay_block",
    "name": "Hay Bale",
    "category": "misc",
    "color": "hsl(206 42% 46%)"
  },
  {
    "id": "minecraft:white_carpet",
    "name": "White Carpet",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_carpet",
    "name": "Orange Carpet",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_carpet",
    "name": "Magenta Carpet",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_carpet",
    "name": "Yellow Carpet",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_carpet",
    "name": "Lime Carpet",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_carpet",
    "name": "Pink Carpet",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_carpet",
    "name": "Gray Carpet",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_carpet",
    "name": "Cyan Carpet",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_carpet",
    "name": "Purple Carpet",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_carpet",
    "name": "Blue Carpet",
    "category": "colour",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_carpet",
    "name": "Brown Carpet",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_carpet",
    "name": "Green Carpet",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_carpet",
    "name": "Red Carpet",
    "category": "colour",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_carpet",
    "name": "Black Carpet",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:terracotta",
    "name": "Terracotta",
    "category": "colour",
    "color": "hsl(85 42% 46%)"
  },
  {
    "id": "minecraft:coal_block",
    "name": "Block of Coal",
    "category": "misc",
    "color": "hsl(317 42% 46%)"
  },
  {
    "id": "minecraft:packed_ice",
    "name": "Packed Ice",
    "category": "glass",
    "color": "#a6ddf6"
  },
  {
    "id": "minecraft:red_sandstone",
    "name": "Red Sandstone",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:chiseled_red_sandstone",
    "name": "Chiseled Red Sandstone",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:cut_red_sandstone",
    "name": "Cut Red Sandstone",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:red_sandstone_stairs",
    "name": "Red Sandstone Stairs",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:oak_slab",
    "name": "Oak Slab",
    "category": "wood",
    "color": "hsl(112 42% 46%)"
  },
  {
    "id": "minecraft:spruce_slab",
    "name": "Spruce Slab",
    "category": "wood",
    "color": "hsl(359 42% 46%)"
  },
  {
    "id": "minecraft:birch_slab",
    "name": "Birch Slab",
    "category": "wood",
    "color": "hsl(193 42% 46%)"
  },
  {
    "id": "minecraft:jungle_slab",
    "name": "Jungle Slab",
    "category": "wood",
    "color": "hsl(340 42% 46%)"
  },
  {
    "id": "minecraft:acacia_slab",
    "name": "Acacia Slab",
    "category": "wood",
    "color": "hsl(165 42% 46%)"
  },
  {
    "id": "minecraft:cherry_slab",
    "name": "Cherry Slab",
    "category": "wood",
    "color": "hsl(208 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_slab",
    "name": "Dark Oak Slab",
    "category": "wood",
    "color": "hsl(65 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_slab",
    "name": "Pale Oak Slab",
    "category": "wood",
    "color": "hsl(333 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_slab",
    "name": "Mangrove Slab",
    "category": "wood",
    "color": "hsl(104 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_slab",
    "name": "Bamboo Slab",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:bamboo_mosaic_slab",
    "name": "Bamboo Mosaic Slab",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stone_slab",
    "name": "Stone Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:smooth_stone_slab",
    "name": "Smooth Stone Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:sandstone_slab",
    "name": "Sandstone Slab",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:cut_sandstone_slab",
    "name": "Cut Sandstone Slab",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:petrified_oak_slab",
    "name": "Petrified Oak Slab",
    "category": "wood",
    "color": "hsl(55 42% 46%)"
  },
  {
    "id": "minecraft:cobblestone_slab",
    "name": "Cobblestone Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:brick_slab",
    "name": "Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:stone_brick_slab",
    "name": "Stone Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mud_brick_slab",
    "name": "Mud Brick Slab",
    "category": "terrain",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:nether_brick_slab",
    "name": "Nether Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:quartz_slab",
    "name": "Quartz Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:red_sandstone_slab",
    "name": "Red Sandstone Slab",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:cut_red_sandstone_slab",
    "name": "Cut Red Sandstone Slab",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:purpur_slab",
    "name": "Purpur Slab",
    "category": "misc",
    "color": "hsl(249 42% 46%)"
  },
  {
    "id": "minecraft:smooth_stone",
    "name": "Smooth Stone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:smooth_sandstone",
    "name": "Smooth Sandstone",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:smooth_quartz",
    "name": "Smooth Quartz Block",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:smooth_red_sandstone",
    "name": "Smooth Red Sandstone",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:spruce_fence_gate",
    "name": "Spruce Fence Gate",
    "category": "wood",
    "color": "hsl(278 42% 46%)"
  },
  {
    "id": "minecraft:birch_fence_gate",
    "name": "Birch Fence Gate",
    "category": "wood",
    "color": "hsl(104 42% 46%)"
  },
  {
    "id": "minecraft:jungle_fence_gate",
    "name": "Jungle Fence Gate",
    "category": "wood",
    "color": "hsl(35 42% 46%)"
  },
  {
    "id": "minecraft:acacia_fence_gate",
    "name": "Acacia Fence Gate",
    "category": "wood",
    "color": "hsl(316 42% 46%)"
  },
  {
    "id": "minecraft:cherry_fence_gate",
    "name": "Cherry Fence Gate",
    "category": "wood",
    "color": "hsl(359 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_fence_gate",
    "name": "Dark Oak Fence Gate",
    "category": "wood",
    "color": "hsl(320 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_fence_gate",
    "name": "Pale Oak Fence Gate",
    "category": "wood",
    "color": "hsl(356 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_fence_gate",
    "name": "Mangrove Fence Gate",
    "category": "wood",
    "color": "hsl(303 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_fence_gate",
    "name": "Bamboo Fence Gate",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:spruce_fence",
    "name": "Spruce Fence",
    "category": "wood",
    "color": "hsl(292 42% 46%)"
  },
  {
    "id": "minecraft:birch_fence",
    "name": "Birch Fence",
    "category": "wood",
    "color": "hsl(250 42% 46%)"
  },
  {
    "id": "minecraft:jungle_fence",
    "name": "Jungle Fence",
    "category": "wood",
    "color": "hsl(335 42% 46%)"
  },
  {
    "id": "minecraft:acacia_fence",
    "name": "Acacia Fence",
    "category": "wood",
    "color": "hsl(302 42% 46%)"
  },
  {
    "id": "minecraft:cherry_fence",
    "name": "Cherry Fence",
    "category": "wood",
    "color": "hsl(259 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_fence",
    "name": "Dark Oak Fence",
    "category": "wood",
    "color": "hsl(330 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_fence",
    "name": "Pale Oak Fence",
    "category": "wood",
    "color": "hsl(254 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_fence",
    "name": "Mangrove Fence",
    "category": "wood",
    "color": "hsl(67 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_fence",
    "name": "Bamboo Fence",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:spruce_door",
    "name": "Spruce Door",
    "category": "wood",
    "color": "hsl(347 42% 46%)"
  },
  {
    "id": "minecraft:birch_door",
    "name": "Birch Door",
    "category": "wood",
    "color": "hsl(181 42% 46%)"
  },
  {
    "id": "minecraft:jungle_door",
    "name": "Jungle Door",
    "category": "wood",
    "color": "hsl(328 42% 46%)"
  },
  {
    "id": "minecraft:acacia_door",
    "name": "Acacia Door",
    "category": "wood",
    "color": "hsl(153 42% 46%)"
  },
  {
    "id": "minecraft:cherry_door",
    "name": "Cherry Door",
    "category": "wood",
    "color": "hsl(196 42% 46%)"
  },
  {
    "id": "minecraft:dark_oak_door",
    "name": "Dark Oak Door",
    "category": "wood",
    "color": "hsl(53 42% 46%)"
  },
  {
    "id": "minecraft:pale_oak_door",
    "name": "Pale Oak Door",
    "category": "wood",
    "color": "hsl(321 42% 46%)"
  },
  {
    "id": "minecraft:mangrove_door",
    "name": "Mangrove Door",
    "category": "wood",
    "color": "hsl(92 42% 46%)"
  },
  {
    "id": "minecraft:bamboo_door",
    "name": "Bamboo Door",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:end_rod",
    "name": "End Rod",
    "category": "misc",
    "color": "hsl(275 42% 46%)"
  },
  {
    "id": "minecraft:chorus_plant",
    "name": "Chorus Plant",
    "category": "nature",
    "color": "hsl(218 42% 46%)"
  },
  {
    "id": "minecraft:chorus_flower",
    "name": "Chorus Flower",
    "category": "nature",
    "color": "hsl(276 42% 46%)"
  },
  {
    "id": "minecraft:purpur_block",
    "name": "Purpur Block",
    "category": "misc",
    "color": "hsl(78 42% 46%)"
  },
  {
    "id": "minecraft:purpur_pillar",
    "name": "Purpur Pillar",
    "category": "misc",
    "color": "hsl(161 42% 46%)"
  },
  {
    "id": "minecraft:purpur_stairs",
    "name": "Purpur Stairs",
    "category": "misc",
    "color": "hsl(209 42% 46%)"
  },
  {
    "id": "minecraft:end_stone_bricks",
    "name": "End Stone Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:pitcher_crop",
    "name": "Pitcher Crop",
    "category": "nature",
    "color": "hsl(186 42% 46%)"
  },
  {
    "id": "minecraft:dirt_path",
    "name": "Dirt Path",
    "category": "terrain",
    "color": "#65482e"
  },
  {
    "id": "minecraft:frosted_ice",
    "name": "Frosted Ice",
    "category": "glass",
    "color": "#a6ddf6"
  },
  {
    "id": "minecraft:magma_block",
    "name": "Magma Block",
    "category": "misc",
    "color": "hsl(109 42% 46%)"
  },
  {
    "id": "minecraft:nether_wart_block",
    "name": "Nether Wart Block",
    "category": "misc",
    "color": "hsl(57 42% 46%)"
  },
  {
    "id": "minecraft:red_nether_bricks",
    "name": "Red Nether Bricks",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:bone_block",
    "name": "Bone Block",
    "category": "misc",
    "color": "hsl(82 42% 46%)"
  },
  {
    "id": "minecraft:observer",
    "name": "Observer",
    "category": "utility",
    "color": "hsl(110 42% 46%)"
  },
  {
    "id": "minecraft:shulker_box",
    "name": "Shulker Box",
    "category": "misc",
    "color": "hsl(336 42% 46%)"
  },
  {
    "id": "minecraft:white_shulker_box",
    "name": "White Shulker Box",
    "category": "misc",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_shulker_box",
    "name": "Orange Shulker Box",
    "category": "misc",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_shulker_box",
    "name": "Magenta Shulker Box",
    "category": "misc",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_shulker_box",
    "name": "Yellow Shulker Box",
    "category": "misc",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_shulker_box",
    "name": "Lime Shulker Box",
    "category": "misc",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_shulker_box",
    "name": "Pink Shulker Box",
    "category": "misc",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_shulker_box",
    "name": "Gray Shulker Box",
    "category": "misc",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_shulker_box",
    "name": "Cyan Shulker Box",
    "category": "misc",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_shulker_box",
    "name": "Purple Shulker Box",
    "category": "misc",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_shulker_box",
    "name": "Blue Shulker Box",
    "category": "misc",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_shulker_box",
    "name": "Brown Shulker Box",
    "category": "misc",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_shulker_box",
    "name": "Green Shulker Box",
    "category": "misc",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_shulker_box",
    "name": "Red Shulker Box",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_shulker_box",
    "name": "Black Shulker Box",
    "category": "misc",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:white_glazed_terracotta",
    "name": "White Glazed Terracotta",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_glazed_terracotta",
    "name": "Orange Glazed Terracotta",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_glazed_terracotta",
    "name": "Magenta Glazed Terracotta",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_glazed_terracotta",
    "name": "Yellow Glazed Terracotta",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_glazed_terracotta",
    "name": "Lime Glazed Terracotta",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_glazed_terracotta",
    "name": "Pink Glazed Terracotta",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_glazed_terracotta",
    "name": "Gray Glazed Terracotta",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_glazed_terracotta",
    "name": "Cyan Glazed Terracotta",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_glazed_terracotta",
    "name": "Purple Glazed Terracotta",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_glazed_terracotta",
    "name": "Blue Glazed Terracotta",
    "category": "colour",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_glazed_terracotta",
    "name": "Brown Glazed Terracotta",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_glazed_terracotta",
    "name": "Green Glazed Terracotta",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_glazed_terracotta",
    "name": "Red Glazed Terracotta",
    "category": "colour",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_glazed_terracotta",
    "name": "Black Glazed Terracotta",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:white_concrete",
    "name": "White Concrete",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_concrete",
    "name": "Orange Concrete",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_concrete",
    "name": "Magenta Concrete",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_concrete",
    "name": "Yellow Concrete",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_concrete",
    "name": "Lime Concrete",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_concrete",
    "name": "Pink Concrete",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_concrete",
    "name": "Gray Concrete",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_concrete",
    "name": "Cyan Concrete",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_concrete",
    "name": "Purple Concrete",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_concrete",
    "name": "Blue Concrete",
    "category": "colour",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_concrete",
    "name": "Brown Concrete",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_concrete",
    "name": "Green Concrete",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_concrete",
    "name": "Red Concrete",
    "category": "colour",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_concrete",
    "name": "Black Concrete",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:white_concrete_powder",
    "name": "White Concrete Powder",
    "category": "colour",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_concrete_powder",
    "name": "Orange Concrete Powder",
    "category": "colour",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_concrete_powder",
    "name": "Magenta Concrete Powder",
    "category": "colour",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_concrete_powder",
    "name": "Yellow Concrete Powder",
    "category": "colour",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_concrete_powder",
    "name": "Lime Concrete Powder",
    "category": "colour",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_concrete_powder",
    "name": "Pink Concrete Powder",
    "category": "colour",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_concrete_powder",
    "name": "Gray Concrete Powder",
    "category": "colour",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_concrete_powder",
    "name": "Cyan Concrete Powder",
    "category": "colour",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_concrete_powder",
    "name": "Purple Concrete Powder",
    "category": "colour",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_concrete_powder",
    "name": "Blue Concrete Powder",
    "category": "colour",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_concrete_powder",
    "name": "Brown Concrete Powder",
    "category": "colour",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_concrete_powder",
    "name": "Green Concrete Powder",
    "category": "colour",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_concrete_powder",
    "name": "Red Concrete Powder",
    "category": "colour",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_concrete_powder",
    "name": "Black Concrete Powder",
    "category": "colour",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:dried_kelp_block",
    "name": "Dried Kelp Block",
    "category": "nature",
    "color": "hsl(289 42% 46%)"
  },
  {
    "id": "minecraft:turtle_egg",
    "name": "Turtle Egg",
    "category": "misc",
    "color": "hsl(50 42% 46%)"
  },
  {
    "id": "minecraft:sniffer_egg",
    "name": "Sniffer Egg",
    "category": "misc",
    "color": "hsl(209 42% 46%)"
  },
  {
    "id": "minecraft:dried_ghast",
    "name": "Dried Ghast",
    "category": "misc",
    "color": "hsl(124 42% 46%)"
  },
  {
    "id": "minecraft:dead_tube_coral_block",
    "name": "Dead Tube Coral Block",
    "category": "nature",
    "color": "hsl(183 42% 46%)"
  },
  {
    "id": "minecraft:dead_brain_coral_block",
    "name": "Dead Brain Coral Block",
    "category": "nature",
    "color": "hsl(179 42% 46%)"
  },
  {
    "id": "minecraft:dead_bubble_coral_block",
    "name": "Dead Bubble Coral Block",
    "category": "nature",
    "color": "hsl(239 42% 46%)"
  },
  {
    "id": "minecraft:dead_horn_coral_block",
    "name": "Dead Horn Coral Block",
    "category": "nature",
    "color": "hsl(238 42% 46%)"
  },
  {
    "id": "minecraft:tube_coral_block",
    "name": "Tube Coral Block",
    "category": "nature",
    "color": "hsl(148 42% 46%)"
  },
  {
    "id": "minecraft:brain_coral_block",
    "name": "Brain Coral Block",
    "category": "nature",
    "color": "hsl(22 42% 46%)"
  },
  {
    "id": "minecraft:bubble_coral_block",
    "name": "Bubble Coral Block",
    "category": "nature",
    "color": "hsl(340 42% 46%)"
  },
  {
    "id": "minecraft:horn_coral_block",
    "name": "Horn Coral Block",
    "category": "nature",
    "color": "hsl(203 42% 46%)"
  },
  {
    "id": "minecraft:sea_pickle",
    "name": "Sea Pickle",
    "category": "misc",
    "color": "hsl(178 42% 46%)"
  },
  {
    "id": "minecraft:blue_ice",
    "name": "Blue Ice",
    "category": "glass",
    "color": "#315db7"
  },
  {
    "id": "minecraft:conduit",
    "name": "Conduit",
    "category": "misc",
    "color": "hsl(302 42% 46%)"
  },
  {
    "id": "minecraft:bamboo",
    "name": "Bamboo",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:potted_bamboo",
    "name": "Potted Bamboo",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:polished_granite_stairs",
    "name": "Polished Granite Stairs",
    "category": "stone",
    "color": "hsl(190 42% 46%)"
  },
  {
    "id": "minecraft:smooth_red_sandstone_stairs",
    "name": "Smooth Red Sandstone Stairs",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:mossy_stone_brick_stairs",
    "name": "Mossy Stone Brick Stairs",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:polished_diorite_stairs",
    "name": "Polished Diorite Stairs",
    "category": "stone",
    "color": "hsl(198 42% 46%)"
  },
  {
    "id": "minecraft:mossy_cobblestone_stairs",
    "name": "Mossy Cobblestone Stairs",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:end_stone_brick_stairs",
    "name": "End Stone Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:stone_stairs",
    "name": "Stone Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:smooth_sandstone_stairs",
    "name": "Smooth Sandstone Stairs",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:smooth_quartz_stairs",
    "name": "Smooth Quartz Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:granite_stairs",
    "name": "Granite Stairs",
    "category": "stone",
    "color": "hsl(175 42% 46%)"
  },
  {
    "id": "minecraft:andesite_stairs",
    "name": "Andesite Stairs",
    "category": "stone",
    "color": "hsl(140 42% 46%)"
  },
  {
    "id": "minecraft:red_nether_brick_stairs",
    "name": "Red Nether Brick Stairs",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:polished_andesite_stairs",
    "name": "Polished Andesite Stairs",
    "category": "stone",
    "color": "hsl(181 42% 46%)"
  },
  {
    "id": "minecraft:diorite_stairs",
    "name": "Diorite Stairs",
    "category": "stone",
    "color": "hsl(183 42% 46%)"
  },
  {
    "id": "minecraft:polished_granite_slab",
    "name": "Polished Granite Slab",
    "category": "stone",
    "color": "hsl(198 42% 46%)"
  },
  {
    "id": "minecraft:smooth_red_sandstone_slab",
    "name": "Smooth Red Sandstone Slab",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:mossy_stone_brick_slab",
    "name": "Mossy Stone Brick Slab",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:polished_diorite_slab",
    "name": "Polished Diorite Slab",
    "category": "stone",
    "color": "hsl(94 42% 46%)"
  },
  {
    "id": "minecraft:mossy_cobblestone_slab",
    "name": "Mossy Cobblestone Slab",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:end_stone_brick_slab",
    "name": "End Stone Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:smooth_sandstone_slab",
    "name": "Smooth Sandstone Slab",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:smooth_quartz_slab",
    "name": "Smooth Quartz Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:granite_slab",
    "name": "Granite Slab",
    "category": "stone",
    "color": "hsl(55 42% 46%)"
  },
  {
    "id": "minecraft:andesite_slab",
    "name": "Andesite Slab",
    "category": "stone",
    "color": "hsl(92 42% 46%)"
  },
  {
    "id": "minecraft:red_nether_brick_slab",
    "name": "Red Nether Brick Slab",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:polished_andesite_slab",
    "name": "Polished Andesite Slab",
    "category": "stone",
    "color": "hsl(29 42% 46%)"
  },
  {
    "id": "minecraft:diorite_slab",
    "name": "Diorite Slab",
    "category": "stone",
    "color": "hsl(55 42% 46%)"
  },
  {
    "id": "minecraft:brick_wall",
    "name": "Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:prismarine_wall",
    "name": "Prismarine Wall",
    "category": "stone",
    "color": "hsl(243 42% 46%)"
  },
  {
    "id": "minecraft:red_sandstone_wall",
    "name": "Red Sandstone Wall",
    "category": "terrain",
    "color": "#b73737"
  },
  {
    "id": "minecraft:mossy_stone_brick_wall",
    "name": "Mossy Stone Brick Wall",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:granite_wall",
    "name": "Granite Wall",
    "category": "stone",
    "color": "hsl(279 42% 46%)"
  },
  {
    "id": "minecraft:stone_brick_wall",
    "name": "Stone Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:mud_brick_wall",
    "name": "Mud Brick Wall",
    "category": "terrain",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:nether_brick_wall",
    "name": "Nether Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:andesite_wall",
    "name": "Andesite Wall",
    "category": "stone",
    "color": "hsl(316 42% 46%)"
  },
  {
    "id": "minecraft:red_nether_brick_wall",
    "name": "Red Nether Brick Wall",
    "category": "stone",
    "color": "#b73737"
  },
  {
    "id": "minecraft:sandstone_wall",
    "name": "Sandstone Wall",
    "category": "terrain",
    "color": "#d2c67f"
  },
  {
    "id": "minecraft:end_stone_brick_wall",
    "name": "End Stone Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:diorite_wall",
    "name": "Diorite Wall",
    "category": "stone",
    "color": "hsl(279 42% 46%)"
  },
  {
    "id": "minecraft:scaffolding",
    "name": "Scaffolding",
    "category": "utility",
    "color": "hsl(4 42% 46%)"
  },
  {
    "id": "minecraft:loom",
    "name": "Loom",
    "category": "misc",
    "color": "hsl(169 42% 46%)"
  },
  {
    "id": "minecraft:barrel",
    "name": "Barrel",
    "category": "utility",
    "color": "hsl(302 42% 46%)"
  },
  {
    "id": "minecraft:smoker",
    "name": "Smoker",
    "category": "misc",
    "color": "hsl(27 42% 46%)"
  },
  {
    "id": "minecraft:blast_furnace",
    "name": "Blast Furnace",
    "category": "utility",
    "color": "hsl(193 42% 46%)"
  },
  {
    "id": "minecraft:cartography_table",
    "name": "Cartography Table",
    "category": "utility",
    "color": "hsl(209 42% 46%)"
  },
  {
    "id": "minecraft:fletching_table",
    "name": "Fletching Table",
    "category": "utility",
    "color": "hsl(167 42% 46%)"
  },
  {
    "id": "minecraft:grindstone",
    "name": "Grindstone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:lectern",
    "name": "Lectern",
    "category": "misc",
    "color": "hsl(231 42% 46%)"
  },
  {
    "id": "minecraft:smithing_table",
    "name": "Smithing Table",
    "category": "utility",
    "color": "hsl(190 42% 46%)"
  },
  {
    "id": "minecraft:stonecutter",
    "name": "Stonecutter",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:bell",
    "name": "Bell",
    "category": "utility",
    "color": "hsl(355 42% 46%)"
  },
  {
    "id": "minecraft:lantern",
    "name": "Lantern",
    "category": "utility",
    "color": "hsl(134 42% 46%)"
  },
  {
    "id": "minecraft:soul_lantern",
    "name": "Soul Lantern",
    "category": "utility",
    "color": "hsl(146 42% 46%)"
  },
  {
    "id": "minecraft:warped_stem",
    "name": "Warped Stem",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_warped_stem",
    "name": "Stripped Warped Stem",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:warped_hyphae",
    "name": "Warped Hyphae",
    "category": "wood",
    "color": "hsl(45 42% 46%)"
  },
  {
    "id": "minecraft:stripped_warped_hyphae",
    "name": "Stripped Warped Hyphae",
    "category": "wood",
    "color": "hsl(173 42% 46%)"
  },
  {
    "id": "minecraft:warped_nylium",
    "name": "Warped Nylium",
    "category": "wood",
    "color": "hsl(16 42% 46%)"
  },
  {
    "id": "minecraft:warped_wart_block",
    "name": "Warped Wart Block",
    "category": "wood",
    "color": "hsl(138 42% 46%)"
  },
  {
    "id": "minecraft:crimson_stem",
    "name": "Crimson Stem",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:stripped_crimson_stem",
    "name": "Stripped Crimson Stem",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:crimson_hyphae",
    "name": "Crimson Hyphae",
    "category": "wood",
    "color": "hsl(101 42% 46%)"
  },
  {
    "id": "minecraft:stripped_crimson_hyphae",
    "name": "Stripped Crimson Hyphae",
    "category": "wood",
    "color": "hsl(309 42% 46%)"
  },
  {
    "id": "minecraft:crimson_nylium",
    "name": "Crimson Nylium",
    "category": "wood",
    "color": "hsl(72 42% 46%)"
  },
  {
    "id": "minecraft:crimson_planks",
    "name": "Crimson Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:warped_planks",
    "name": "Warped Planks",
    "category": "wood",
    "color": "#a77a45"
  },
  {
    "id": "minecraft:crimson_slab",
    "name": "Crimson Slab",
    "category": "wood",
    "color": "hsl(218 42% 46%)"
  },
  {
    "id": "minecraft:warped_slab",
    "name": "Warped Slab",
    "category": "wood",
    "color": "hsl(42 42% 46%)"
  },
  {
    "id": "minecraft:crimson_fence",
    "name": "Crimson Fence",
    "category": "wood",
    "color": "hsl(209 42% 46%)"
  },
  {
    "id": "minecraft:warped_fence",
    "name": "Warped Fence",
    "category": "wood",
    "color": "hsl(353 42% 46%)"
  },
  {
    "id": "minecraft:crimson_trapdoor",
    "name": "Crimson Trapdoor",
    "category": "wood",
    "color": "hsl(219 42% 46%)"
  },
  {
    "id": "minecraft:warped_trapdoor",
    "name": "Warped Trapdoor",
    "category": "wood",
    "color": "hsl(131 42% 46%)"
  },
  {
    "id": "minecraft:crimson_fence_gate",
    "name": "Crimson Fence Gate",
    "category": "wood",
    "color": "hsl(185 42% 46%)"
  },
  {
    "id": "minecraft:warped_fence_gate",
    "name": "Warped Fence Gate",
    "category": "wood",
    "color": "hsl(65 42% 46%)"
  },
  {
    "id": "minecraft:crimson_stairs",
    "name": "Crimson Stairs",
    "category": "wood",
    "color": "hsl(34 42% 46%)"
  },
  {
    "id": "minecraft:warped_stairs",
    "name": "Warped Stairs",
    "category": "wood",
    "color": "hsl(338 42% 46%)"
  },
  {
    "id": "minecraft:crimson_door",
    "name": "Crimson Door",
    "category": "wood",
    "color": "hsl(206 42% 46%)"
  },
  {
    "id": "minecraft:warped_door",
    "name": "Warped Door",
    "category": "wood",
    "color": "hsl(30 42% 46%)"
  },
  {
    "id": "minecraft:test_block",
    "name": "Test Block",
    "category": "misc",
    "color": "hsl(48 42% 46%)"
  },
  {
    "id": "minecraft:test_instance_block",
    "name": "Test Instance Block",
    "category": "misc",
    "color": "hsl(264 42% 46%)"
  },
  {
    "id": "minecraft:composter",
    "name": "Composter",
    "category": "misc",
    "color": "hsl(350 42% 46%)"
  },
  {
    "id": "minecraft:target",
    "name": "Target",
    "category": "misc",
    "color": "hsl(17 42% 46%)"
  },
  {
    "id": "minecraft:bee_nest",
    "name": "Bee Nest",
    "category": "misc",
    "color": "hsl(53 42% 46%)"
  },
  {
    "id": "minecraft:beehive",
    "name": "Beehive",
    "category": "misc",
    "color": "hsl(138 42% 46%)"
  },
  {
    "id": "minecraft:honey_block",
    "name": "Honey Block",
    "category": "misc",
    "color": "hsl(297 42% 46%)"
  },
  {
    "id": "minecraft:honeycomb_block",
    "name": "Honeycomb Block",
    "category": "misc",
    "color": "hsl(202 42% 46%)"
  },
  {
    "id": "minecraft:netherite_block",
    "name": "Block of Netherite",
    "category": "misc",
    "color": "hsl(56 42% 46%)"
  },
  {
    "id": "minecraft:ancient_debris",
    "name": "Ancient Debris",
    "category": "misc",
    "color": "hsl(298 42% 46%)"
  },
  {
    "id": "minecraft:crying_obsidian",
    "name": "Crying Obsidian",
    "category": "misc",
    "color": "hsl(338 42% 46%)"
  },
  {
    "id": "minecraft:respawn_anchor",
    "name": "Respawn Anchor",
    "category": "misc",
    "color": "hsl(172 42% 46%)"
  },
  {
    "id": "minecraft:potted_crimson_fungus",
    "name": "Potted Crimson Fungus",
    "category": "wood",
    "color": "hsl(287 42% 46%)"
  },
  {
    "id": "minecraft:potted_warped_fungus",
    "name": "Potted Warped Fungus",
    "category": "wood",
    "color": "hsl(37 42% 46%)"
  },
  {
    "id": "minecraft:potted_crimson_roots",
    "name": "Potted Crimson Roots",
    "category": "wood",
    "color": "hsl(320 42% 46%)"
  },
  {
    "id": "minecraft:potted_warped_roots",
    "name": "Potted Warped Roots",
    "category": "wood",
    "color": "hsl(258 42% 46%)"
  },
  {
    "id": "minecraft:lodestone",
    "name": "Lodestone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:blackstone",
    "name": "Blackstone",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:blackstone_stairs",
    "name": "Blackstone Stairs",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:blackstone_wall",
    "name": "Blackstone Wall",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:blackstone_slab",
    "name": "Blackstone Slab",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone",
    "name": "Polished Blackstone",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_bricks",
    "name": "Polished Blackstone Bricks",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:cracked_polished_blackstone_bricks",
    "name": "Cracked Polished Blackstone Bricks",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:chiseled_polished_blackstone",
    "name": "Chiseled Polished Blackstone",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_brick_slab",
    "name": "Polished Blackstone Brick Slab",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_brick_stairs",
    "name": "Polished Blackstone Brick Stairs",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_brick_wall",
    "name": "Polished Blackstone Brick Wall",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:gilded_blackstone",
    "name": "Gilded Blackstone",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_stairs",
    "name": "Polished Blackstone Stairs",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_slab",
    "name": "Polished Blackstone Slab",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:polished_blackstone_wall",
    "name": "Polished Blackstone Wall",
    "category": "stone",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:chiseled_nether_bricks",
    "name": "Chiseled Nether Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:cracked_nether_bricks",
    "name": "Cracked Nether Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:quartz_bricks",
    "name": "Quartz Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:candle",
    "name": "Candle",
    "category": "utility",
    "color": "hsl(165 42% 46%)"
  },
  {
    "id": "minecraft:white_candle",
    "name": "White Candle",
    "category": "utility",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_candle",
    "name": "Orange Candle",
    "category": "utility",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_candle",
    "name": "Magenta Candle",
    "category": "utility",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_candle",
    "name": "Yellow Candle",
    "category": "utility",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_candle",
    "name": "Lime Candle",
    "category": "utility",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_candle",
    "name": "Pink Candle",
    "category": "utility",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_candle",
    "name": "Gray Candle",
    "category": "utility",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_candle",
    "name": "Cyan Candle",
    "category": "utility",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_candle",
    "name": "Purple Candle",
    "category": "utility",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_candle",
    "name": "Blue Candle",
    "category": "utility",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_candle",
    "name": "Brown Candle",
    "category": "utility",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_candle",
    "name": "Green Candle",
    "category": "utility",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_candle",
    "name": "Red Candle",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_candle",
    "name": "Black Candle",
    "category": "utility",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:candle_cake",
    "name": "Cake with Candle",
    "category": "utility",
    "color": "hsl(226 42% 46%)"
  },
  {
    "id": "minecraft:white_candle_cake",
    "name": "Cake with White Candle",
    "category": "utility",
    "color": "#eeeeee"
  },
  {
    "id": "minecraft:orange_candle_cake",
    "name": "Cake with Orange Candle",
    "category": "utility",
    "color": "#d98633"
  },
  {
    "id": "minecraft:magenta_candle_cake",
    "name": "Cake with Magenta Candle",
    "category": "utility",
    "color": "#b84ac0"
  },
  {
    "id": "minecraft:yellow_candle_cake",
    "name": "Cake with Yellow Candle",
    "category": "utility",
    "color": "#d8c34a"
  },
  {
    "id": "minecraft:lime_candle_cake",
    "name": "Cake with Lime Candle",
    "category": "utility",
    "color": "#7aba36"
  },
  {
    "id": "minecraft:pink_candle_cake",
    "name": "Cake with Pink Candle",
    "category": "utility",
    "color": "#d978a2"
  },
  {
    "id": "minecraft:gray_candle_cake",
    "name": "Cake with Gray Candle",
    "category": "utility",
    "color": "#777777"
  },
  {
    "id": "minecraft:cyan_candle_cake",
    "name": "Cake with Cyan Candle",
    "category": "utility",
    "color": "#2b9aa5"
  },
  {
    "id": "minecraft:purple_candle_cake",
    "name": "Cake with Purple Candle",
    "category": "utility",
    "color": "#7b4ab8"
  },
  {
    "id": "minecraft:blue_candle_cake",
    "name": "Cake with Blue Candle",
    "category": "utility",
    "color": "#315db7"
  },
  {
    "id": "minecraft:brown_candle_cake",
    "name": "Cake with Brown Candle",
    "category": "utility",
    "color": "#79512e"
  },
  {
    "id": "minecraft:green_candle_cake",
    "name": "Cake with Green Candle",
    "category": "utility",
    "color": "#4f8b3d"
  },
  {
    "id": "minecraft:red_candle_cake",
    "name": "Cake with Red Candle",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:black_candle_cake",
    "name": "Cake with Black Candle",
    "category": "utility",
    "color": "#1f1f1f"
  },
  {
    "id": "minecraft:amethyst_block",
    "name": "Block of Amethyst",
    "category": "misc",
    "color": "hsl(67 42% 46%)"
  },
  {
    "id": "minecraft:budding_amethyst",
    "name": "Budding Amethyst",
    "category": "misc",
    "color": "hsl(269 42% 46%)"
  },
  {
    "id": "minecraft:amethyst_cluster",
    "name": "Amethyst Cluster",
    "category": "misc",
    "color": "hsl(104 42% 46%)"
  },
  {
    "id": "minecraft:large_amethyst_bud",
    "name": "Large Amethyst Bud",
    "category": "misc",
    "color": "hsl(19 42% 46%)"
  },
  {
    "id": "minecraft:medium_amethyst_bud",
    "name": "Medium Amethyst Bud",
    "category": "misc",
    "color": "hsl(145 42% 46%)"
  },
  {
    "id": "minecraft:small_amethyst_bud",
    "name": "Small Amethyst Bud",
    "category": "misc",
    "color": "hsl(31 42% 46%)"
  },
  {
    "id": "minecraft:tuff",
    "name": "Tuff",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_slab",
    "name": "Tuff Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_stairs",
    "name": "Tuff Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_wall",
    "name": "Tuff Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:polished_tuff",
    "name": "Polished Tuff",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:polished_tuff_slab",
    "name": "Polished Tuff Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:polished_tuff_stairs",
    "name": "Polished Tuff Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:polished_tuff_wall",
    "name": "Polished Tuff Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:chiseled_tuff",
    "name": "Chiseled Tuff",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_bricks",
    "name": "Tuff Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_brick_slab",
    "name": "Tuff Brick Slab",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_brick_stairs",
    "name": "Tuff Brick Stairs",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tuff_brick_wall",
    "name": "Tuff Brick Wall",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:chiseled_tuff_bricks",
    "name": "Chiseled Tuff Bricks",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:calcite",
    "name": "Calcite",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:tinted_glass",
    "name": "Tinted Glass",
    "category": "glass",
    "color": "#a6ddf6"
  },
  {
    "id": "minecraft:sculk_sensor",
    "name": "Sculk Sensor",
    "category": "misc",
    "color": "hsl(101 42% 46%)"
  },
  {
    "id": "minecraft:calibrated_sculk_sensor",
    "name": "Calibrated Sculk Sensor",
    "category": "misc",
    "color": "hsl(71 42% 46%)"
  },
  {
    "id": "minecraft:sculk",
    "name": "Sculk",
    "category": "misc",
    "color": "hsl(36 42% 46%)"
  },
  {
    "id": "minecraft:sculk_catalyst",
    "name": "Sculk Catalyst",
    "category": "misc",
    "color": "hsl(84 42% 46%)"
  },
  {
    "id": "minecraft:sculk_shrieker",
    "name": "Sculk Shrieker",
    "category": "misc",
    "color": "hsl(242 42% 46%)"
  },
  {
    "id": "minecraft:copper_block",
    "name": "Block of Copper",
    "category": "misc",
    "color": "hsl(199 42% 46%)"
  },
  {
    "id": "minecraft:exposed_copper",
    "name": "Exposed Copper",
    "category": "misc",
    "color": "hsl(256 42% 46%)"
  },
  {
    "id": "minecraft:weathered_copper",
    "name": "Weathered Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:oxidized_copper",
    "name": "Oxidized Copper",
    "category": "misc",
    "color": "hsl(116 42% 46%)"
  },
  {
    "id": "minecraft:copper_ore",
    "name": "Copper Ore",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:deepslate_copper_ore",
    "name": "Deepslate Copper Ore",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:oxidized_cut_copper",
    "name": "Oxidized Cut Copper",
    "category": "misc",
    "color": "hsl(217 42% 46%)"
  },
  {
    "id": "minecraft:weathered_cut_copper",
    "name": "Weathered Cut Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:exposed_cut_copper",
    "name": "Exposed Cut Copper",
    "category": "misc",
    "color": "hsl(117 42% 46%)"
  },
  {
    "id": "minecraft:cut_copper",
    "name": "Cut Copper",
    "category": "misc",
    "color": "hsl(310 42% 46%)"
  },
  {
    "id": "minecraft:oxidized_chiseled_copper",
    "name": "Oxidized Chiseled Copper",
    "category": "misc",
    "color": "hsl(200 42% 46%)"
  },
  {
    "id": "minecraft:weathered_chiseled_copper",
    "name": "Weathered Chiseled Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:exposed_chiseled_copper",
    "name": "Exposed Chiseled Copper",
    "category": "misc",
    "color": "hsl(356 42% 46%)"
  },
  {
    "id": "minecraft:chiseled_copper",
    "name": "Chiseled Copper",
    "category": "misc",
    "color": "hsl(99 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_chiseled_copper",
    "name": "Waxed Oxidized Chiseled Copper",
    "category": "misc",
    "color": "hsl(282 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_chiseled_copper",
    "name": "Waxed Weathered Chiseled Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_exposed_chiseled_copper",
    "name": "Waxed Exposed Chiseled Copper",
    "category": "misc",
    "color": "hsl(10 42% 46%)"
  },
  {
    "id": "minecraft:waxed_chiseled_copper",
    "name": "Waxed Chiseled Copper",
    "category": "misc",
    "color": "hsl(313 42% 46%)"
  },
  {
    "id": "minecraft:oxidized_cut_copper_stairs",
    "name": "Oxidized Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(208 42% 46%)"
  },
  {
    "id": "minecraft:weathered_cut_copper_stairs",
    "name": "Weathered Cut Copper Stairs",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:exposed_cut_copper_stairs",
    "name": "Exposed Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(332 42% 46%)"
  },
  {
    "id": "minecraft:cut_copper_stairs",
    "name": "Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(115 42% 46%)"
  },
  {
    "id": "minecraft:oxidized_cut_copper_slab",
    "name": "Oxidized Cut Copper Slab",
    "category": "misc",
    "color": "hsl(32 42% 46%)"
  },
  {
    "id": "minecraft:weathered_cut_copper_slab",
    "name": "Weathered Cut Copper Slab",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:exposed_cut_copper_slab",
    "name": "Exposed Cut Copper Slab",
    "category": "misc",
    "color": "hsl(84 42% 46%)"
  },
  {
    "id": "minecraft:cut_copper_slab",
    "name": "Cut Copper Slab",
    "category": "misc",
    "color": "hsl(291 42% 46%)"
  },
  {
    "id": "minecraft:waxed_copper_block",
    "name": "Waxed Block of Copper",
    "category": "misc",
    "color": "hsl(209 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_copper",
    "name": "Waxed Weathered Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_exposed_copper",
    "name": "Waxed Exposed Copper",
    "category": "misc",
    "color": "hsl(306 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_copper",
    "name": "Waxed Oxidized Copper",
    "category": "misc",
    "color": "hsl(330 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_cut_copper",
    "name": "Waxed Oxidized Cut Copper",
    "category": "misc",
    "color": "hsl(231 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_cut_copper",
    "name": "Waxed Weathered Cut Copper",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_exposed_cut_copper",
    "name": "Waxed Exposed Cut Copper",
    "category": "misc",
    "color": "hsl(119 42% 46%)"
  },
  {
    "id": "minecraft:waxed_cut_copper",
    "name": "Waxed Cut Copper",
    "category": "misc",
    "color": "hsl(16 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_cut_copper_stairs",
    "name": "Waxed Oxidized Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(106 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_cut_copper_stairs",
    "name": "Waxed Weathered Cut Copper Stairs",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_exposed_cut_copper_stairs",
    "name": "Waxed Exposed Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(122 42% 46%)"
  },
  {
    "id": "minecraft:waxed_cut_copper_stairs",
    "name": "Waxed Cut Copper Stairs",
    "category": "misc",
    "color": "hsl(193 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_cut_copper_slab",
    "name": "Waxed Oxidized Cut Copper Slab",
    "category": "misc",
    "color": "hsl(10 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_cut_copper_slab",
    "name": "Waxed Weathered Cut Copper Slab",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_exposed_cut_copper_slab",
    "name": "Waxed Exposed Cut Copper Slab",
    "category": "misc",
    "color": "hsl(202 42% 46%)"
  },
  {
    "id": "minecraft:waxed_cut_copper_slab",
    "name": "Waxed Cut Copper Slab",
    "category": "misc",
    "color": "hsl(145 42% 46%)"
  },
  {
    "id": "minecraft:copper_door",
    "name": "Copper Door",
    "category": "utility",
    "color": "hsl(156 42% 46%)"
  },
  {
    "id": "minecraft:exposed_copper_door",
    "name": "Exposed Copper Door",
    "category": "utility",
    "color": "hsl(133 42% 46%)"
  },
  {
    "id": "minecraft:oxidized_copper_door",
    "name": "Oxidized Copper Door",
    "category": "utility",
    "color": "hsl(217 42% 46%)"
  },
  {
    "id": "minecraft:weathered_copper_door",
    "name": "Weathered Copper Door",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_copper_door",
    "name": "Waxed Copper Door",
    "category": "utility",
    "color": "hsl(98 42% 46%)"
  },
  {
    "id": "minecraft:waxed_exposed_copper_door",
    "name": "Waxed Exposed Copper Door",
    "category": "utility",
    "color": "hsl(147 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_copper_door",
    "name": "Waxed Oxidized Copper Door",
    "category": "utility",
    "color": "hsl(331 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_copper_door",
    "name": "Waxed Weathered Copper Door",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:copper_trapdoor",
    "name": "Copper Trapdoor",
    "category": "utility",
    "color": "hsl(49 42% 46%)"
  },
  {
    "id": "minecraft:exposed_copper_trapdoor",
    "name": "Exposed Copper Trapdoor",
    "category": "utility",
    "color": "hsl(202 42% 46%)"
  },
  {
    "id": "minecraft:oxidized_copper_trapdoor",
    "name": "Oxidized Copper Trapdoor",
    "category": "utility",
    "color": "hsl(150 42% 46%)"
  },
  {
    "id": "minecraft:weathered_copper_trapdoor",
    "name": "Weathered Copper Trapdoor",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_copper_trapdoor",
    "name": "Waxed Copper Trapdoor",
    "category": "utility",
    "color": "hsl(263 42% 46%)"
  },
  {
    "id": "minecraft:waxed_exposed_copper_trapdoor",
    "name": "Waxed Exposed Copper Trapdoor",
    "category": "utility",
    "color": "hsl(216 42% 46%)"
  },
  {
    "id": "minecraft:waxed_oxidized_copper_trapdoor",
    "name": "Waxed Oxidized Copper Trapdoor",
    "category": "utility",
    "color": "hsl(128 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_copper_trapdoor",
    "name": "Waxed Weathered Copper Trapdoor",
    "category": "utility",
    "color": "#b73737"
  },
  {
    "id": "minecraft:copper_grate",
    "name": "Copper Grate",
    "category": "misc",
    "color": "hsl(297 42% 46%)"
  },
  {
    "id": "minecraft:exposed_copper_grate",
    "name": "Exposed Copper Grate",
    "category": "misc",
    "color": "hsl(248 42% 46%)"
  },
  {
    "id": "minecraft:weathered_copper_grate",
    "name": "Weathered Copper Grate",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:oxidized_copper_grate",
    "name": "Oxidized Copper Grate",
    "category": "misc",
    "color": "hsl(44 42% 46%)"
  },
  {
    "id": "minecraft:waxed_copper_grate",
    "name": "Waxed Copper Grate",
    "category": "misc",
    "color": "hsl(307 42% 46%)"
  },
  {
    "id": "minecraft:waxed_exposed_copper_grate",
    "name": "Waxed Exposed Copper Grate",
    "category": "misc",
    "color": "hsl(2 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_copper_grate",
    "name": "Waxed Weathered Copper Grate",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_oxidized_copper_grate",
    "name": "Waxed Oxidized Copper Grate",
    "category": "misc",
    "color": "hsl(66 42% 46%)"
  },
  {
    "id": "minecraft:copper_bulb",
    "name": "Copper Bulb",
    "category": "misc",
    "color": "hsl(231 42% 46%)"
  },
  {
    "id": "minecraft:exposed_copper_bulb",
    "name": "Exposed Copper Bulb",
    "category": "misc",
    "color": "hsl(208 42% 46%)"
  },
  {
    "id": "minecraft:weathered_copper_bulb",
    "name": "Weathered Copper Bulb",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:oxidized_copper_bulb",
    "name": "Oxidized Copper Bulb",
    "category": "misc",
    "color": "hsl(292 42% 46%)"
  },
  {
    "id": "minecraft:waxed_copper_bulb",
    "name": "Waxed Copper Bulb",
    "category": "misc",
    "color": "hsl(173 42% 46%)"
  },
  {
    "id": "minecraft:waxed_exposed_copper_bulb",
    "name": "Waxed Exposed Copper Bulb",
    "category": "misc",
    "color": "hsl(222 42% 46%)"
  },
  {
    "id": "minecraft:waxed_weathered_copper_bulb",
    "name": "Waxed Weathered Copper Bulb",
    "category": "misc",
    "color": "#b73737"
  },
  {
    "id": "minecraft:waxed_oxidized_copper_bulb",
    "name": "Waxed Oxidized Copper Bulb",
    "category": "misc",
    "color": "hsl(46 42% 46%)"
  },
  {
    "id": "minecraft:pointed_dripstone",
    "name": "Pointed Dripstone",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:dripstone_block",
    "name": "Dripstone Block",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:azalea",
    "name": "Azalea",
    "category": "misc",
    "color": "hsl(352 42% 46%)"
  },
  {
    "id": "minecraft:flowering_azalea",
    "name": "Flowering Azalea",
    "category": "nature",
    "color": "hsl(320 42% 46%)"
  },
  {
    "id": "minecraft:moss_carpet",
    "name": "Moss Carpet",
    "category": "colour",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:moss_block",
    "name": "Moss Block",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:big_dripleaf",
    "name": "Big Dripleaf",
    "category": "misc",
    "color": "hsl(282 42% 46%)"
  },
  {
    "id": "minecraft:rooted_dirt",
    "name": "Rooted Dirt",
    "category": "terrain",
    "color": "#65482e"
  },
  {
    "id": "minecraft:mud",
    "name": "Mud",
    "category": "terrain",
    "color": "#65482e"
  },
  {
    "id": "minecraft:deepslate",
    "name": "Deepslate",
    "category": "stone",
    "color": "#3e3e3e"
  },
  {
    "id": "minecraft:cobbled_deepslate",
    "name": "Cobbled Deepslate",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:cobbled_deepslate_stairs",
    "name": "Cobbled Deepslate Stairs",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:cobbled_deepslate_slab",
    "name": "Cobbled Deepslate Slab",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:cobbled_deepslate_wall",
    "name": "Cobbled Deepslate Wall",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:polished_deepslate",
    "name": "Polished Deepslate",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:polished_deepslate_stairs",
    "name": "Polished Deepslate Stairs",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:polished_deepslate_slab",
    "name": "Polished Deepslate Slab",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:polished_deepslate_wall",
    "name": "Polished Deepslate Wall",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_tiles",
    "name": "Deepslate Tiles",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_tile_stairs",
    "name": "Deepslate Tile Stairs",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_tile_slab",
    "name": "Deepslate Tile Slab",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_tile_wall",
    "name": "Deepslate Tile Wall",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_bricks",
    "name": "Deepslate Bricks",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_brick_stairs",
    "name": "Deepslate Brick Stairs",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_brick_slab",
    "name": "Deepslate Brick Slab",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:deepslate_brick_wall",
    "name": "Deepslate Brick Wall",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:chiseled_deepslate",
    "name": "Chiseled Deepslate",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:cracked_deepslate_bricks",
    "name": "Cracked Deepslate Bricks",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:cracked_deepslate_tiles",
    "name": "Cracked Deepslate Tiles",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:infested_deepslate",
    "name": "Infested Deepslate",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:smooth_basalt",
    "name": "Smooth Basalt",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:raw_iron_block",
    "name": "Block of Raw Iron",
    "category": "misc",
    "color": "hsl(109 42% 46%)"
  },
  {
    "id": "minecraft:raw_copper_block",
    "name": "Block of Raw Copper",
    "category": "misc",
    "color": "hsl(174 42% 46%)"
  },
  {
    "id": "minecraft:raw_gold_block",
    "name": "Block of Raw Gold",
    "category": "misc",
    "color": "hsl(165 42% 46%)"
  },
  {
    "id": "minecraft:potted_azalea_bush",
    "name": "Potted Azalea",
    "category": "utility",
    "color": "hsl(318 42% 46%)"
  },
  {
    "id": "minecraft:potted_flowering_azalea_bush",
    "name": "Potted Flowering Azalea",
    "category": "utility",
    "color": "hsl(46 42% 46%)"
  },
  {
    "id": "minecraft:reinforced_deepslate",
    "name": "Reinforced Deepslate",
    "category": "stone",
    "color": "#3f3f43"
  },
  {
    "id": "minecraft:decorated_pot",
    "name": "Decorated Pot",
    "category": "utility",
    "color": "hsl(357 42% 46%)"
  },
  {
    "id": "minecraft:crafter",
    "name": "Crafter",
    "category": "utility",
    "color": "hsl(77 42% 46%)"
  },
  {
    "id": "minecraft:trial_spawner",
    "name": "Trial Spawner",
    "category": "misc",
    "color": "hsl(319 42% 46%)"
  },
  {
    "id": "minecraft:vault",
    "name": "Vault",
    "category": "misc",
    "color": "hsl(226 42% 46%)"
  },
  {
    "id": "minecraft:heavy_core",
    "name": "Heavy Core",
    "category": "stone",
    "color": "#8a8a8a"
  },
  {
    "id": "minecraft:pale_moss_block",
    "name": "Pale Moss Block",
    "category": "terrain",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:pale_moss_carpet",
    "name": "Pale Moss Carpet",
    "category": "colour",
    "color": "#4c7d38"
  },
  {
    "id": "minecraft:potted_open_eyeblossom",
    "name": "Potted Open Eyeblossom",
    "category": "utility",
    "color": "hsl(358 42% 46%)"
  },
  {
    "id": "minecraft:potted_closed_eyeblossom",
    "name": "Potted Closed Eyeblossom",
    "category": "utility",
    "color": "hsl(276 42% 46%)"
  },
  {
    "id": "minecraft:redstone_wire",
    "name": "Redstone Wire",
    "category": "redstone",
    "color": "#c92222"
  },
  {
    "id": "minecraft:redstone_torch",
    "name": "Redstone Torch",
    "category": "redstone",
    "color": "#f04432"
  },
  {
    "id": "minecraft:redstone_wall_torch",
    "name": "Redstone Wall Torch",
    "category": "redstone",
    "color": "#f04432"
  },
  {
    "id": "minecraft:lever",
    "name": "Lever",
    "category": "redstone",
    "color": "#8d7551"
  },
  {
    "id": "minecraft:stone_button",
    "name": "Stone Button",
    "category": "redstone",
    "color": "#8b8b8b"
  },
  {
    "id": "minecraft:oak_button",
    "name": "Oak Button",
    "category": "redstone",
    "color": "#b38b52"
  },
  {
    "id": "minecraft:stone_pressure_plate",
    "name": "Stone Pressure Plate",
    "category": "redstone",
    "color": "#8b8b8b"
  },
  {
    "id": "minecraft:oak_pressure_plate",
    "name": "Oak Pressure Plate",
    "category": "redstone",
    "color": "#b38b52"
  },
  {
    "id": "minecraft:powered_rail",
    "name": "Powered Rail",
    "category": "redstone",
    "color": "#c49b37"
  },
  {
    "id": "minecraft:detector_rail",
    "name": "Detector Rail",
    "category": "redstone",
    "color": "#9a6a35"
  },
  {
    "id": "minecraft:activator_rail",
    "name": "Activator Rail",
    "category": "redstone",
    "color": "#b27c36"
  },
  {
    "id": "minecraft:daylight_detector",
    "name": "Daylight Detector",
    "category": "redstone",
    "color": "#c9b47b"
  },
  {
    "id": "minecraft:tripwire_hook",
    "name": "Tripwire Hook",
    "category": "redstone",
    "color": "#7c6a55"
  },
  {
    "id": "minecraft:tripwire",
    "name": "Tripwire",
    "category": "redstone",
    "color": "#d8d8d8"
  },
  {
    "id": "minecraft:sculk_sensor",
    "name": "Sculk Sensor",
    "category": "redstone",
    "color": "#15535f"
  },
  {
    "id": "minecraft:calibrated_sculk_sensor",
    "name": "Calibrated Sculk Sensor",
    "category": "redstone",
    "color": "#1b6070"
  },
  {
    "id": "minecraft:crafter",
    "name": "Crafter",
    "category": "redstone",
    "color": "#7d756b"
  },
  {
    "id": "minecraft:copper_bulb",
    "name": "Copper Bulb",
    "category": "redstone",
    "color": "#b8734a"
  }
];

export const DEFAULT_BLOCK_ID = 'minecraft:stone';

const BLOCK_BY_ID = new Map(BLOCKS.map(b => [b.id, b]));

export function baseBlockId(id: string): string {
  return String(id || 'minecraft:air').split('[')[0];
}

export function getBlockById(id: string): BlockDef {
  return BLOCK_BY_ID.get(baseBlockId(id)) ?? BLOCKS[0];
}

export function isKnownBlock(id: string): boolean {
  return BLOCK_BY_ID.has(baseBlockId(id));
}
