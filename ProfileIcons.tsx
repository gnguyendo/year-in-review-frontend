// function getAllProfileIcons(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   }
  
//   const allProfileIcons = getAllProfileIcons(require.context('/public/profileicon/', false, /\.(png|jpe?g|svg)$/));
  


//   export default allProfileIcons;


import Twenty28 from '/public/profileicons/28.png';

const allProfileIcons = {
    Twenty28
}


export default allProfileIcons;