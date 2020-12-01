const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray=[]
let ready=false;
let imagesLoaded=0;
let totalImages=0;

//check for loaded func
function imageLoaded(){
    console.log('loaded');
    imagesLoaded++;
    if(imagesLoaded=== totalImages){
        ready=true;
        loader.hidden=true;
    }
}

//helper function 

function setAttributes(element, attributes){
    for( const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
//Create Elements for links&photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('total images= ',totalImages);
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item=document.createElement('a');
       // item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank' );
        setAttributes(item, { href: photo.links.html, target:'_blank',});
        // create <img>
        const img=document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description,});
       // img.setAttribute('src',photo.urls.regular);
       // img.setAttribute('alt', photo.alt_description);
       // img.setAttribute('title', photo.alt_description);
        //Put <img> inside <a> and both inside imageContainter
        // event listener to check if loaded
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// unsplash api
const count=10;
const apiKey='q9xCOVmp1ybk0UDlgT0iDybO7nXYRAVnM5Qc82Np3iY';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//function for fetch
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
      // console.log(photosArray);
        displayPhotos();
    }
    catch(error){
        console.log(error);
    }
}

// check to see if scrolling near bottom

window.addEventListener('scroll', () => {
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready==true){
     ready=false;
     getPhotos();
    
    }
 });

 getPhotos();