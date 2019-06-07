class LazyLoadImages {

    static get SUPPORTS_INTERSECTION_OBSERVER () {
      return ('IntersectionObserver' in window);
    }
    
    static get HANDLED_CLASS () {
      return 'js-lazy-image--handled';
    }
    
    static get THRESHOLD () {
      return 0.01;
    }
    
    static init () {
      if (this._instance) {
        this._instance._disconnect();
      }
    
      this._count = 0;
      this._instance = new LazyLoadImages();
    }
    
    constructor () {
      const images = document.querySelectorAll('.lazy');
      const config = {
        rootMargin: '300px 0px',
        threshold: LazyLoadImages.THRESHOLD
      };
    
      this._count = images.length;
      this._onIntersection = this._onIntersection.bind(this);
      this._observer = new IntersectionObserver(this._onIntersection, config);
      images.forEach(image => {
        if (image.classList.contains(LazyLoadImages.HANDLED_CLASS)) {
          return;
        }
    
        this._observer.observe(image);
      });
    }
    
    _disconnect () {
      if (!this._observer) {
        return;
      }
    
      this._observer.disconnect();
    }
    
    _onIntersection (entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio <= 0) {
          return;
        }
    
        this._count--;
        this._observer.unobserve(entry.target);
        this._applyImage(entry.target);
      });
    
      if (this._count > 0) {
        return;
      }
    
      this._observer.disconnect();
    }
    _applyImage (img) {

      console.log('💩');
      if(img.tagName === 'VIDEO') {
        img.querySelectorAll('source').forEach(source => source.src = source.dataset.src);

        img.load();
        img.classList.add(LazyLoadImages.HANDLED_CLASS);

      }else if(img.tagName === 'IMG') {
        if(img.dataset.src === undefined || typeof img.dataset.src === typeof undefined || img.dataset.src === false || img.dataset.src === '') {
          return;
        }

        if(!(img.dataset.srcset === undefined || typeof img.dataset.srcset === typeof undefined || img.dataset.srcset === false || img.dataset.srcset === '')) {
            img.srcset = img.dataset.srcset;
        }
        img.src = img.dataset.src;
        img.classList.add(LazyLoadImages.HANDLED_CLASS);
      }else if(img.tagName === 'IFRAME') {
        img.src = img.dataset.src;
        img.classList.add(LazyLoadImages.HANDLED_CLASS);
      }
    }
  }
  
export default LazyLoadImages;