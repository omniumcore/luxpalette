export type ColorCategory = 'pastel' | 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'brown' | 'pink' | 'grey' | 'purple' | 'white' | 'black';

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  categories: ColorCategory[];
  tags: string[];
}

export const PALETTE_CATEGORIES: { id: ColorCategory; label: string }[] = [
  { id: 'pastel', label: 'Pastel' },
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'green', label: 'Green' },
  { id: 'orange', label: 'Orange' },
  { id: 'brown', label: 'Brown' },
  { id: 'pink', label: 'Pink' },
  { id: 'grey', label: 'Grey' },
  { id: 'purple', label: 'Purple' },
  { id: 'white', label: 'White' },
  { id: 'black', label: 'Black' },
];

export const PALETTES: Palette[] = [
  // Pastel (10)
  { id: 'p1', name: 'Soft Bloom', colors: ['#FFB3D9', '#FFD4B3', '#E0D4FF', '#C0E5FF', '#D4FFC0'], categories: ['pastel', 'pink'], tags: ['soft', 'dreamy', 'light'] },
  { id: 'p2', name: 'Cotton Candy', colors: ['#FFB3E6', '#FFD4C0', '#E6F3FF', '#D4FFE6', '#F3E6FF'], categories: ['pastel', 'pink'], tags: ['sweet', 'gentle', 'pastel'] },
  { id: 'p3', name: 'Milky Way', colors: ['#E5D4FF', '#D4E5FF', '#D4FFF5', '#FFE5D4', '#FFF5D4'], categories: ['pastel'], tags: ['ethereal', 'soft', 'dreamy'] },
  { id: 'p4', name: 'Cloud Nine', colors: ['#FFE5EC', '#E5F5FF', '#F0E5FF', '#E5FFF5', '#FFF5E5'], categories: ['pastel', 'white'], tags: ['light', 'airy', 'clean'] },
  { id: 'p5', name: 'Candy Dreams', colors: ['#FFB3D9', '#FFADAD', '#FFD4A3', '#FDFFB6', '#B3E5FC'], categories: ['pastel', 'pink', 'yellow'], tags: ['playful', 'sweet', 'vibrant'] },
  { id: 'p6', name: 'Lavender Field', colors: ['#D4B3FF', '#C0B3FF', '#D4C0FF', '#E0D4FF', '#F0E5FF'], categories: ['pastel', 'purple'], tags: ['relaxing', 'soft', 'floral'] },
  { id: 'p7', name: 'Peachy Keen', colors: ['#FFD4A3', '#FFC0A3', '#FFB8A3', '#FFC9A3', '#FFDC99'], categories: ['pastel', 'orange'], tags: ['warm', 'inviting', 'soft'] },
  { id: 'p8', name: 'Mint Fresh', colors: ['#B3FFDB', '#A3FFE0', '#C0FFE8', '#D4FFF5', '#E0FFFC'], categories: ['pastel', 'green'], tags: ['fresh', 'cool', 'minty'] },
  { id: 'p9', name: 'Blush Heaven', colors: ['#FFE0E6', '#FFD4DB', '#FFC9D4', '#FFB8D4', '#FFC0DC'], categories: ['pastel', 'pink', 'white'], tags: ['romantic', 'soft', 'delicate'] },
  { id: 'p10', name: 'Sky Dreams', colors: ['#B3D9FF', '#C0E5FF', '#D4E8FF', '#E0F0FF', '#E8F5FF'], categories: ['pastel', 'blue', 'white'], tags: ['peaceful', 'calm', 'serene'] },

  // Red (8)
  { id: 'r1', name: 'Crimson Heart', colors: ['#DC143C', '#E63946', '#FF1744', '#C41E3A', '#8B0000'], categories: ['red'], tags: ['bold', 'vibrant', 'passionate'] },
  { id: 'r2', name: 'Ruby Red', colors: ['#E63946', '#E76F51', '#EA5455', '#E84C3D', '#D62828'], categories: ['red', 'orange'], tags: ['rich', 'deep', 'elegant'] },
  { id: 'r3', name: 'Sunset Blaze', colors: ['#FF6B35', '#FF5733', '#FF4500', '#FF6347', '#FF7F50'], categories: ['red', 'orange'], tags: ['warm', 'energetic', 'dramatic'] },
  { id: 'r4', name: 'Berry Blast', colors: ['#C41E3A', '#E63946', '#FF6B9D', '#C81D25', '#B91C3E'], categories: ['red', 'pink'], tags: ['fruity', 'vibrant', 'fun'] },
  { id: 'r5', name: 'Fire Truck', colors: ['#FF0000', '#FF1744', '#E63946', '#DD0031', '#CC0000'], categories: ['red'], tags: ['bright', 'alert', 'intense'] },
  { id: 'r6', name: 'Pomegranate', colors: ['#9B0000', '#C41E3A', '#E63946', '#FF1744', '#FF6B9D'], categories: ['red', 'pink'], tags: ['dark', 'rich', 'luxurious'] },
  { id: 'r7', name: 'Rose Petal', colors: ['#E74C3C', '#EC7063', '#F5B7B1', '#FADBD8', '#FBDEDB'], categories: ['red', 'pink'], tags: ['romantic', 'soft', 'feminine'] },
  { id: 'r8', name: 'Spicy Red', colors: ['#D32F2F', '#E53935', '#EF5350', '#F44336', '#E57373'], categories: ['red'], tags: ['bold', 'modern', 'vibrant'] },

  // Blue (10)
  { id: 'b1', name: 'Ocean Wave', colors: ['#0099FF', '#0080FF', '#0066CC', '#005A99', '#003D66'], categories: ['blue'], tags: ['deep', 'calming', 'professional'] },
  { id: 'b2', name: 'Sky Blue', colors: ['#87CEEB', '#00BFFF', '#1E90FF', '#4169E1', '#0099FF'], categories: ['blue', 'white'], tags: ['light', 'airy', 'peaceful'] },
  { id: 'b3', name: 'Midnight', colors: ['#000080', '#003D7A', '#0047AB', '#0066CC', '#1E90FF'], categories: ['blue', 'black'], tags: ['dark', 'professional', 'deep'] },
  { id: 'b4', name: 'Navy Breeze', colors: ['#1A237E', '#283593', '#3F51B5', '#5C6BC0', '#7986CB'], categories: ['blue'], tags: ['sophisticated', 'calm', 'trustworthy'] },
  { id: 'b5', name: 'Cyber Blue', colors: ['#00B4D8', '#0096C7', '#0077B6', '#0066B2', '#00539B'], categories: ['blue'], tags: ['modern', 'tech', 'vibrant'] },
  { id: 'b6', name: 'Royal Blue', colors: ['#4169E1', '#6495ED', '#8DB3FF', '#ADD8E6', '#B0E0E6'], categories: ['blue', 'purple'], tags: ['regal', 'majestic', 'rich'] },
  { id: 'b7', name: 'Glacier Lake', colors: ['#B0E0E6', '#00CED1', '#20B2AA', '#48D1CC', '#7FFFD4'], categories: ['blue', 'green'], tags: ['cool', 'refreshing', 'crisp'] },
  { id: 'b8', name: 'Electric Blue', colors: ['#0099FF', '#00B4D8', '#00D4FF', '#00E5FF', '#00F5FF'], categories: ['blue'], tags: ['bright', 'energetic', 'futuristic'] },
  { id: 'b9', name: 'Cobalt Dream', colors: ['#003DA5', '#0052CC', '#0066FF', '#3366FF', '#6699FF'], categories: ['blue', 'purple'], tags: ['dreamy', 'vibrant', 'bold'] },
  { id: 'b10', name: 'Teal Waters', colors: ['#008B8B', '#00A9A9', '#20B2AA', '#48D1CC', '#7FFFD4'], categories: ['blue', 'green'], tags: ['ocean', 'tropical', 'serene'] },

  // Yellow (8)
  { id: 'y1', name: 'Golden Hour', colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520', '#B8860B'], categories: ['yellow', 'orange'], tags: ['warm', 'luxurious', 'classic'] },
  { id: 'y2', name: 'Sunny Days', colors: ['#FFFF00', '#FFED4E', '#FFA500', '#FF8C00', '#FF6347'], categories: ['yellow', 'orange'], tags: ['bright', 'cheerful', 'vibrant'] },
  { id: 'y3', name: 'Banana Split', colors: ['#FFFF99', '#FFFF66', '#FFFF00', '#FFCC00', '#FFAA00'], categories: ['yellow'], tags: ['playful', 'fun', 'light'] },
  { id: 'y4', name: 'Lemon Lime', colors: ['#CCFF00', '#FFFF00', '#FFCC00', '#FFAA00', '#FF9900'], categories: ['yellow', 'green'], tags: ['fresh', 'zesty', 'energetic'] },
  { id: 'y5', name: 'Sunflower', colors: ['#FFD700', '#FFC700', '#FFAA00', '#FF9500', '#FF8C00'], categories: ['yellow', 'orange'], tags: ['warm', 'natural', 'radiant'] },
  { id: 'y6', name: 'Buttercup', colors: ['#FFFACD', '#FFFF99', '#FFFF66', '#FFFF00', '#FFDD00'], categories: ['yellow', 'white'], tags: ['soft', 'gentle', 'cheerful'] },
  { id: 'y7', name: 'Mustard Dream', colors: ['#C9A961', '#E6C200', '#FFDD00', '#FFCC00', '#FFAA00'], categories: ['yellow', 'brown'], tags: ['vintage', 'warm', 'earthy'] },
  { id: 'y8', name: 'Canary Song', colors: ['#FFFF00', '#FFFACD', '#FFE4B5', '#FFD700', '#FFBA00'], categories: ['yellow', 'orange'], tags: ['bright', 'cheerful', 'luminous'] },

  // Green (8)
  { id: 'g1', name: 'Forest Green', colors: ['#228B22', '#32CD32', '#00C800', '#00AA00', '#006400'], categories: ['green'], tags: ['natural', 'earthy', 'calming'] },
  { id: 'g2', name: 'Lime Zest', colors: ['#32CD32', '#00FF00', '#00FA9A', '#00FF7F', '#3CB371'], categories: ['green', 'yellow'], tags: ['vibrant', 'fresh', 'energetic'] },
  { id: 'g3', name: 'Mint Mojito', colors: ['#98FF98', '#90EE90', '#00FF7F', '#00FA9A', '#7FFFD4'], categories: ['green'], tags: ['refreshing', 'cool', 'zesty'] },
  { id: 'g4', name: 'Evergreen', colors: ['#0B6623', '#1B5E20', '#2E7D32', '#388E3C', '#43A047'], categories: ['green'], tags: ['deep', 'natural', 'trustworthy'] },
  { id: 'g5', name: 'Sage Wisdom', colors: ['#9DC183', '#A8C686', '#B3CE8F', '#A4AC86', '#8B9878'], categories: ['green', 'grey'], tags: ['muted', 'sophisticated', 'natural'] },
  { id: 'g6', name: 'Seafoam', colors: ['#93E9BE', '#7FFFD4', '#66EEC6', '#5DFFB3', '#4EFFA0'], categories: ['green', 'blue'], tags: ['fresh', 'tropical', 'cool'] },
  { id: 'g7', name: 'Kiwi Pop', colors: ['#00FF00', '#33CC00', '#66FF00', '#99FF00', '#CCFF00'], categories: ['green', 'yellow'], tags: ['bright', 'fun', 'playful'] },
  { id: 'g8', name: 'Moss Garden', colors: ['#556B2F', '#6B8E23', '#7CB342', '#8BC34A', '#9CCC65'], categories: ['green', 'brown'], tags: ['earthy', 'natural', 'calm'] },

  // Orange (8)
  { id: 'o1', name: 'Tangerine Dream', colors: ['#FF8C00', '#FFA500', '#FFB84D', '#FFC266', '#FFCC99'], categories: ['orange', 'yellow'], tags: ['warm', 'energetic', 'happy'] },
  { id: 'o2', name: 'Pumpkin Patch', colors: ['#FF8C00', '#FF7F50', '#FF6347', '#FF5722', '#FF4500'], categories: ['orange', 'red'], tags: ['warm', 'autumn', 'spicy'] },
  { id: 'o3', name: 'Coral Reef', colors: ['#FF7F50', '#FF6347', '#FF6B6B', '#FF8C42', '#FFA07A'], categories: ['orange', 'red'], tags: ['vibrant', 'tropical', 'lively'] },
  { id: 'o4', name: 'Apricot Blush', colors: ['#FFCC99', '#FFB366', '#FF9966', '#FF8866', '#FF7777'], categories: ['orange', 'pink'], tags: ['soft', 'warm', 'feminine'] },
  { id: 'o5', name: 'Sunset Glow', colors: ['#FFB347', '#FF9966', '#FF6347', '#FF4500', '#FF3300'], categories: ['orange', 'red'], tags: ['dramatic', 'warm', 'passionate'] },
  { id: 'o6', name: 'Burnt Orange', colors: ['#8B4513', '#A0522D', '#CD5C5C', '#E08856', '#FF6347'], categories: ['orange', 'brown', 'red'], tags: ['earthy', 'warm', 'vintage'] },
  { id: 'o7', name: 'Peachy Keen', colors: ['#FFDAB9', '#FFCC99', '#FFAA77', '#FF9955', '#FF7733'], categories: ['orange', 'pink'], tags: ['soft', 'inviting', 'warm'] },
  { id: 'o8', name: 'Marmalade', colors: ['#E67E22', '#E8993B', '#EA9D52', '#ECB169', '#EFC580'], categories: ['orange'], tags: ['rich', 'warm', 'inviting'] },

  // Brown (7)
  { id: 'br1', name: 'Chocolate Truffle', colors: ['#3E2723', '#5D4037', '#6D4C41', '#795548', '#8D6E63'], categories: ['brown'], tags: ['rich', 'warm', 'earthy'] },
  { id: 'br2', name: 'Coffee Bean', colors: ['#2C1810', '#3E2723', '#5D4037', '#6D4C41', '#795548'], categories: ['brown', 'black'], tags: ['deep', 'cozy', 'sophisticated'] },
  { id: 'br3', name: 'Caramel Swirl', colors: ['#D2B48C', '#DEB887', '#C19A6B', '#B8860B', '#8B6914'], categories: ['brown', 'yellow'], tags: ['warm', 'sweet', 'inviting'] },
  { id: 'br4', name: 'Sandy Beach', colors: ['#F4A460', '#D2B48C', '#C9A876', '#CDAA7D', '#BFAB8E'], categories: ['brown', 'orange'], tags: ['warm', 'natural', 'earthy'] },
  { id: 'br5', name: 'Walnut', colors: ['#7C6B5D', '#8B7D6B', '#9B8B7E', '#A89B91', '#B8A89C'], categories: ['brown', 'grey'], tags: ['neutral', 'sophisticated', 'calming'] },
  { id: 'br6', name: 'Cinnamon', colors: ['#A0522D', '#8B4513', '#A0826D', '#B0906F', '#C0A080'], categories: ['brown'], tags: ['warm', 'spicy', 'earthy'] },
  { id: 'br7', name: 'Mocha Cream', colors: ['#9B8B7E', '#A89B91', '#B8A89C', '#CDB8AB', '#D4C4B8'], categories: ['brown', 'white'], tags: ['warm', 'soft', 'creamy'] },

  // Pink (7)
  { id: 'pk1', name: 'Rose Gold', colors: ['#B76E79', '#C9657F', '#DB6B8E', '#ED7F9D', '#FF8FAC'], categories: ['pink', 'orange'], tags: ['luxurious', 'elegant', 'modern'] },
  { id: 'pk2', name: 'Bubblegum', colors: ['#FF69B4', '#FF1493', '#FF6EC7', '#FF85D4', '#FFA2DB'], categories: ['pink'], tags: ['fun', 'playful', 'vibrant'] },
  { id: 'pk3', name: 'Flamingo', colors: ['#FF6B9D', '#FF5B92', '#FF4B87', '#FF3B7C', '#FF2B71'], categories: ['pink', 'red'], tags: ['bold', 'tropical', 'vibrant'] },
  { id: 'pk4', name: 'Cotton Candy', colors: ['#FFB6D9', '#FFC0D4', '#FFCCDB', '#FFD8E2', '#FFE4E9'], categories: ['pink', 'white'], tags: ['sweet', 'soft', 'dreamy'] },
  { id: 'pk5', name: 'Mauve Magic', colors: ['#D896D8', '#E0A0E0', '#E8AAE8', '#F0B4F0', '#F8BEF8'], categories: ['pink', 'purple'], tags: ['magical', 'soft', 'dreamy'] },
  { id: 'pk6', name: 'Blush Crush', colors: ['#FF99BB', '#FF88AA', '#FF7799', '#FF6688', '#FF5577'], categories: ['pink', 'red'], tags: ['romantic', 'sweet', 'feminine'] },
  { id: 'pk7', name: 'Sakura Bloom', colors: ['#FFB7C5', '#FFA6B8', '#FF95AB', '#FF849E', '#FF7391'], categories: ['pink'], tags: ['delicate', 'nature-inspired', 'romantic'] },

  // Grey (7)
  { id: 'gr1', name: 'Silver Lining', colors: ['#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969'], categories: ['grey', 'white'], tags: ['neutral', 'sophisticated', 'calm'] },
  { id: 'gr2', name: 'Charcoal Dreams', colors: ['#36454F', '#2F4F4F', '#404040', '#555555', '#696969'], categories: ['grey', 'black'], tags: ['dark', 'professional', 'serious'] },
  { id: 'gr3', name: 'Stone Path', colors: ['#A9A9A9', '#808080', '#696969', '#555555', '#404040'], categories: ['grey'], tags: ['neutral', 'calm', 'balanced'] },
  { id: 'gr4', name: 'Ash Spectrum', colors: ['#DCDCDC', '#BEBEBE', '#A9A9A9', '#808080', '#505050'], categories: ['grey', 'white', 'black'], tags: ['neutral', 'versatile', 'timeless'] },
  { id: 'gr5', name: 'Smoke Signal', colors: ['#708090', '#778899', '#696969', '#555555', '#404040'], categories: ['grey'], tags: ['moody', 'calm', 'mysterious'] },
  { id: 'gr6', name: 'Platinum', colors: ['#F5F5F5', '#E8E8E8', '#C0C0C0', '#A9A9A9', '#808080'], categories: ['grey', 'white'], tags: ['modern', 'clean', 'sleek'] },
  { id: 'gr7', name: 'Concrete', colors: ['#A8A9AD', '#989FA8', '#888F96', '#787E84', '#686D72'], categories: ['grey'], tags: ['industrial', 'neutral', 'strong'] },

  // Purple (7)
  { id: 'pu1', name: 'Royal Purple', colors: ['#7851A9', '#9370DB', '#BA55D3', '#DA70D6', '#EE82EE'], categories: ['purple', 'pink'], tags: ['regal', 'elegant', 'luxurious'] },
  { id: 'pu2', name: 'Violet Dream', colors: ['#8B00FF', '#9933FF', '#AA66FF', '#BB99FF', '#CCCCFF'], categories: ['purple'], tags: ['magical', 'dreamy', 'vibrant'] },
  { id: 'pu3', name: 'Indigo Night', colors: ['#1A0B2E', '#3D0C57', '#58106E', '#7B2D85', '#A63696'], categories: ['purple', 'black'], tags: ['dark', 'mysterious', 'sophisticated'] },
  { id: 'pu4', name: 'Lavender Haze', colors: ['#D896D8', '#E0A0E0', '#E8AAE8', '#F0B4F0', '#F8BEF8'], categories: ['purple', 'pink'], tags: ['soft', 'calming', 'romantic'] },
  { id: 'pu5', name: 'Plum Perfect', colors: ['#701C86', '#8B3A62', '#A54C7B', '#BF6E94', '#D890AD'], categories: ['purple', 'pink'], tags: ['rich', 'warm', 'luxurious'] },
  { id: 'pu6', name: 'Grape Juice', colors: ['#663399', '#7B4FB8', '#9370DB', '#BA55D3', '#DA70D6'], categories: ['purple'], tags: ['bold', 'fruity', 'vibrant'] },
  { id: 'pu7', name: 'Amethyst Stone', colors: ['#9966CC', '#AA77DD', '#BB88EE', '#CCAAFF', '#DDBBFF'], categories: ['purple'], tags: ['mystical', 'precious', 'elegant'] },

  // White (6)
  { id: 'w1', name: 'Pure White', colors: ['#FFFFFF', '#F8F8F8', '#F0F0F0', '#E8E8E8', '#E0E0E0'], categories: ['white'], tags: ['clean', 'minimal', 'bright'] },
  { id: 'w2', name: 'Ivory Elegance', colors: ['#FFFFF0', '#FFFFF5', '#FFFAF0', '#FFFACD', '#FFF8DC'], categories: ['white', 'yellow'], tags: ['elegant', 'soft', 'warm'] },
  { id: 'w3', name: 'Cloud White', colors: ['#F5F5F5', '#FAFAFA', '#F8F8F8', '#F0F0F0', '#E8E8E8'], categories: ['white'], tags: ['clean', 'airy', 'fresh'] },
  { id: 'w4', name: 'Pearl', colors: ['#FDEEF4', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292'], categories: ['white', 'pink'], tags: ['elegant', 'precious', 'soft'] },
  { id: 'w5', name: 'Milky Whites', colors: ['#FFFFFF', '#FFFBF0', '#FFF9E6', '#FFF8DC', '#FFFAF0'], categories: ['white', 'yellow'], tags: ['pure', 'soft', 'minimal'] },
  { id: 'w6', name: 'Canvas', colors: ['#FAFAFA', '#F5F5F5', '#F0F0F0', '#E8E8E8', '#DEDEDE'], categories: ['white'], tags: ['neutral', 'blank', 'peaceful'] },

  // Black (6)
  { id: 'bl1', name: 'Midnight Black', colors: ['#000000', '#0A0E27', '#16213E', '#0F3460', '#1A1A1A'], categories: ['black'], tags: ['deep', 'mysterious', 'elegant'] },
  { id: 'bl2', name: 'Obsidian', colors: ['#0B0C0E', '#1C1C1C', '#2D2D2D', '#404040', '#555555'], categories: ['black', 'grey'], tags: ['dark', 'sleek', 'modern'] },
  { id: 'bl3', name: 'Void', colors: ['#000000', '#111111', '#222222', '#333333', '#444444'], categories: ['black', 'grey'], tags: ['stark', 'minimal', 'strong'] },
  { id: 'bl4', name: 'Raven', colors: ['#1A1A2E', '#16213E', '#0F3460', '#533483', '#16213E'], categories: ['black', 'purple'], tags: ['dark', 'sophisticated', 'moody'] },
  { id: 'bl5', name: 'Shadow Soul', colors: ['#0D0221', '#3D0C57', '#58106E', '#7B2D85', '#1A1A1A'], categories: ['black', 'purple'], tags: ['mysterious', 'dramatic', 'deep'] },
  { id: 'bl6', name: 'Carbon', colors: ['#1F2937', '#111827', '#030712', '#0D1117', '#161B22'], categories: ['black', 'grey'], tags: ['dark', 'technical', 'modern'] },
];
