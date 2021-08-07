async function getClassInfoByURL(url){
  const data = await fetch(
    'https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1214/7609',
    {
      method: 'GET',
      mode: 'cors',
    }
  );
  const j

}

const URL = 'https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1214/7609';

;(async ()=> {
  await getClassInfoByURL(URL);
})()