class Gallery {
  constructor() {
    // Attributes
    this.currentImage;
    this.thumbnails;

    // UI
    this.lightBox = this.buildDOM();
    document.body.appendChild(this.lightBox);

    this.setEventListeners();

    try {
      document
        .getElementById("categories")
        .addEventListener("click", this.updateThumbnailsList);
      this.listenCategories();
    } catch (error) {
      // There is no categories div
    } finally {
      // this.updateThumbnailsList();
    }

    this.listenThumbnails();
  }

  /**
   * Add click event listener to all category links to show/hide thumbnails
   * @param {Array} // All .thumnails links with img tag inside
   */
  listenCategories() {
    // Get all links in categories zone, names don't matter
    let categories = Array.from(document.querySelectorAll("#categories a"));

    categories.forEach((category) => {
      category.addEventListener("click", (event) => {
        const thumbnails = Array.from(
          document.querySelectorAll("#gallery > a")
        );

        if (event.target.classList.contains("cat-all")) {
          console.log("yolo");
          categories.forEach((category) => {
            category.classList.remove("off");
          });
          thumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove("hidden");
          });
        } else {
          // Add 'off' class to all category links, remove it from event target
          categories.forEach((category) => {
            category.classList.add("off");
          });
          event.target.classList.remove("off");
          // Add 'hidden' class to all thumbnails
          thumbnails.forEach((thumbnail) => {
            thumbnail.classList.add("hidden");
          });
          // Remove 'hidden' class from thumbnails with same class of targeted category
          let selectedThumbnails = Array.from(
            document.getElementsByClassName(event.target.classList[0])
          );
          selectedThumbnails.forEach((selectedThumbnail) => {
            selectedThumbnail.classList.remove("hidden");
          });
        }

        this.updateThumbnailsList();
      });
    });
  }

  /**
   * Find all non hidden thumbnails.
   * @returns Array
   */
  updateThumbnailsList() {
    this.thumbnails = Array.from(
      document.querySelectorAll("#gallery a:not(.hidden)")
    );
    return this.thumbnails;
  }

  /**
   * Build Lightbox div and legend containers.
   * @returns DOM element
   */
  buildDOM() {
    const dom = document.createElement("div");
    dom.id = "lightbox";
    dom.classList.add("off");

    this.imageContainer = document.createElement("div");
    this.imageContainer.classList.add("container");

    this.loader = document.createElement("div");
    this.loader.classList.add("loader");
    this.imageContainer.appendChild(this.loader);

    this.next = document.createElement("button");
    this.next.classList.add("next");
    this.next.textContent = "suivant";

    this.previous = document.createElement("button");
    this.previous.classList.add("previous");
    this.previous.textContent = "précédent";

    this.close = document.createElement("button");
    this.close.classList.add("close");
    this.close.textContent = "fermer";

    // Title & legend
    this.imageLegendBox = document.createElement("div");
    this.imageLegendBox.classList.add("legend-box");
    this.imageTitle = document.createElement("span");
    this.imageLegendBox.appendChild(this.imageTitle);
    this.imageDescription = document.createElement("p");
    this.imageLegendBox.appendChild(this.imageDescription);
    dom.appendChild(this.imageLegendBox);

    dom.appendChild(this.previous);
    dom.appendChild(this.next);
    dom.appendChild(this.close);
    dom.appendChild(this.imageContainer);

    return dom;
  }

  /**
   * Listen to 'click' event on differents parts of Lightbox.
   */
  setEventListeners() {
    this.lightBox.addEventListener("click", this);
  }

  /**
   * Event manager.
   * @param {*} event
   */
  handleEvent(event) {
    switch (event.type) {
      case "click":
        event.stopPropagation();

        if (event.target == this.previous) {
          this.changeImage("left");
        } else if (event.target == this.next) {
          this.changeImage("right");
        } else if (event.target == this.close) {
          this.hideLightbox();
        } else if (event.target == this.lightBox) {
          console.log("Element lightBox clicked!");
        }
    }
  }

  /**
   * Add click event listener to all thumbnails
   * @param {Array} // All .thumnails links with img tag inside
   */
  listenThumbnails() {
    this.updateThumbnailsList();

    this.thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        let index = this.thumbnails.indexOf(event.target.parentElement);
        this.currentImage = index;
        this.lightBox.classList.toggle("off");
        this.showLightBox();
      });
    });
  }

  /**
   * Call lightbox
   */
  callLightBox(event) {
    event.preventDefault();
    let index = this.thumbnails.indexOf(event.target.parentElement);
    this.currentImage = index;
    this.lightBox.classList.toggle("off");
    this.showLightBox();
  }

  /**
   *
   */
  changeImage(direction) {
    this.imageLegendBox.classList.remove("active");

    if (direction == "left") {
      this.currentImage -= 1;

      if (this.currentImage < 0) {
        this.currentImage = this.thumbnails.length - 1;
      }
    } else if (direction == "right") {
      this.currentImage += 1;
      this.imageContainer.classList.remove("appears");

      if (this.currentImage == this.thumbnails.length) {
        this.currentImage = 0;
      }
    }

    this.showLightBox();
  }

  /**
   *
   */
  loadImage(url) {
    // DEBUG: use external random image
    // url = `https://picsum.photos/1920/${ 360 * (this.currentImage + 1) }`;
    // DEBUG

    this.imageContainer.innerHTML = "";
    this.imageContainer.append(this.loader);
    this.loader.classList.add("appears");

    const getImage = (url) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    const setImage = (image) => {
      this.imageContainer.innerHTML = "";
      this.imageContainer.append(image);
      this.imageContainer.classList.add("appears");
      this.imageLegendBox.classList.add("active");
    };

    async function loadImage() {
      let image = await getImage(url);
      return setImage(image);
    }

    loadImage();
  }

  /**
   * Get Title and Alt attributes of Thumbnail image,
   * refresh legend boxes with them.
   */
  updateImageLegend() {
    let thumbnailElement =
      this.thumbnails[this.currentImage].querySelector("img");
    this.imageTitle.textContent = thumbnailElement.getAttribute("title");
    this.imageDescription.textContent = thumbnailElement.getAttribute("alt");
  }

  /**
   * Make appear LightBox.
   */
  showLightBox() {
    this.loadImage(this.thumbnails[this.currentImage].href);
    this.updateImageLegend();
  }

  /**
   * Toggle CSS class 'off' on LightBox.
   */
  hideLightbox() {
    this.lightBox.classList.toggle("off");
  }
}

/*
    =============================================
        GENERAL: STUFF TO DO WHEN DOM'S READY
    =============================================
*/
window.addEventListener("DOMContentLoaded", (event) => {
  const manager = new Gallery();
});
