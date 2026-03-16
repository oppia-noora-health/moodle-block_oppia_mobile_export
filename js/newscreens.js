$(document).ready(function () {
    // Utility function to detect if device supports touch
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
    // ===== Reveal Content Functionality (from oppia.js) =====
    $("[name=reveal]").each(function (i) {
      var revealSection = $(this).addClass("showmore revealed");
      var target = $("#answer" + $(this).attr("id"));
  
      function revealContent() {
        target.addClass("revealed");
        revealSection.removeClass("revealed");
      }
  
      target.addClass("showmore").show();
      if (revealSection.has("button").length > 0) {
        revealSection.find("button").on("click", function () {
          inputValue = revealSection.find("input").eq(0).val();
          if (inputValue != null && inputValue != "") {
            revealContent();
          } else {
            var errorMsg = revealSection.find(".error-msg");
            if (errorMsg.length == 0) {
              errorMsg = $(
                '<div class="error-msg" style="display:none;">You have to enter some text.</div>',
              );
              revealSection.append(errorMsg);
            }
            errorMsg.fadeIn();
          }
        });
      } else {
        revealSection.on("click", revealContent);
      }
    });
    // ===== End Reveal Content Functionality =====
  
    // slides 23,24
    const $cardSlider = $(".card-slider"); // Scope to the specific HTML structure
    const $cardStack = $cardSlider.find(".card-stack"); // Find the card stack within the slider
    const $cards = $cardStack.children().toArray();
  
    let startX = 0;
    let endX = 0;
    let isDragging = false;
  
    // Function to reorder cards
    function reorderCards() {
      const firstCard = $cards.shift(); // Remove the first card
      $cards.push(firstCard); // Add it to the end
      $cardStack.append(firstCard); // Update the DOM
  
      // Update card styles
      $($cards).each(function (index, card) {
        if (index === 0) {
          $(card).css({ transform: "translateY(0) rotate(0deg)", zIndex: 3 });
        } else if (index === 1) {
          $(card).css({
            transform: "translateY(20px) rotate(-5deg)",
            zIndex: 2,
          });
        } else {
          $(card).css({
            transform: "translateY(40px) rotate(5deg)",
            zIndex: 1,
          });
        }
      });
    }
  
    // Touch functionality
    $cardStack.on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
    });
  
    $cardStack.on("touchmove", function (e) {
      endX = e.originalEvent.touches[0].clientX;
    });
  
    $cardStack.on("touchend", function () {
      if (startX > endX + 50) {
        reorderCards(); // Swipe left
      }
    });
  
    // Mouse functionality for desktop
    $cardStack.on("mousedown", function (e) {
      isDragging = true;
      startX = e.clientX;
      e.preventDefault();
    });
  
    $(document).on("mousemove", function (e) {
      if (isDragging) {
        endX = e.clientX;
      }
    });
  
    $(document).on("mouseup", function () {
      if (isDragging && startX > endX + 50) {
        reorderCards(); // Swipe left
      }
      isDragging = false;
    });
    //end
  
    //slides 9,10,12,13
    const $contentSlider = $(".content-slider");
    const $contentSlides = $contentSlider.find(".slide");
    const $navigationDots = $contentSlider.find(".dot");
  
    let currentContentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isContentDragging = false;
  
    // Function to show a specific slide
    function showContentSlide(index) {
      $contentSlides.each(function (i, slide) {
        $(slide).toggleClass("active", i === index);
      });
  
      $navigationDots.each(function (i, dot) {
        $(dot).toggleClass("active", i === index);
      });
    }
  
    // Add event listeners for navigation dots
    $navigationDots.each(function (index, dot) {
      $(dot).on("click", function () {
        currentContentSlide = index;
        showContentSlide(currentContentSlide);
      });
    });
  
    // Touch functionality
    $contentSlider.on("touchstart", function (e) {
      touchStartX = e.originalEvent.touches[0].clientX; // Record the starting touch position
    });
  
    $contentSlider.on("touchmove", function (e) {
      touchEndX = e.originalEvent.touches[0].clientX; // Continuously update the current touch position
    });
  
    $contentSlider.on("touchend", function () {
      if (touchStartX > touchEndX + 50) {
        // Swipe left
        if (currentContentSlide < $contentSlides.length - 1) {
          currentContentSlide++;
          showContentSlide(currentContentSlide);
        }
      } else if (touchStartX < touchEndX - 50) {
        // Swipe right
        if (currentContentSlide > 0) {
          currentContentSlide--;
          showContentSlide(currentContentSlide);
        }
      }
    });
  
    // Mouse functionality for desktop
    $contentSlider.on("mousedown", function (e) {
      isContentDragging = true;
      touchStartX = e.clientX;
      e.preventDefault();
    });
  
    $(document).on("mousemove", function (e) {
      if (isContentDragging) {
        touchEndX = e.clientX;
      }
    });
  
    $(document).on("mouseup", function () {
      if (isContentDragging) {
        if (touchStartX > touchEndX + 50) {
          // Swipe left
          if (currentContentSlide < $contentSlides.length - 1) {
            currentContentSlide++;
            showContentSlide(currentContentSlide);
          }
        } else if (touchStartX < touchEndX - 50) {
          // Swipe right
          if (currentContentSlide > 0) {
            currentContentSlide--;
            showContentSlide(currentContentSlide);
          }
        }
      }
      isContentDragging = false;
    });
  
    // Initialize the first slide
    showContentSlide(currentContentSlide);
    //end
  
    // slides 3,4,5
    const $storySlider = $(".story-slider"); // Scope to the specific slider
    const $storySliderSlides = $storySlider.find(".slide");
    const $storySliderNextButton = $storySlider.find(".next-button");
    const $storySliderPrevButton = $storySlider.find(".prev-button");
  
    let storySliderCurrentSlide = 0;
  
    // Function to update the active slide
    function updateStorySliderSlide(index) {
      $storySliderSlides.each(function (i, slide) {
        $(slide).toggleClass("active", i === index);
      });
  
      // Update button visibility based on the current slide
      if (storySliderCurrentSlide === 0) {
        $storySliderPrevButton.hide(); // Hide the Previous button for the first slide
        $storySliderNextButton.css("display", "flex"); // Show the Next button
      } else if (storySliderCurrentSlide === $storySliderSlides.length - 1) {
        $storySliderPrevButton.css("display", "flex"); // Show the Previous button
        $storySliderNextButton.hide(); // Hide the Next button for the last slide
      } else {
        $storySliderPrevButton.css("display", "flex"); // Show both buttons in the middle slides
        $storySliderNextButton.css("display", "flex");
      }
    }
  
    // Event Listener for Next Button
    $storySliderNextButton.on("click", function () {
      if (storySliderCurrentSlide < $storySliderSlides.length - 1) {
        storySliderCurrentSlide++;
        updateStorySliderSlide(storySliderCurrentSlide);
      }
    });
  
    // Event Listener for Previous Button
    $storySliderPrevButton.on("click", function () {
      if (storySliderCurrentSlide > 0) {
        storySliderCurrentSlide--;
        updateStorySliderSlide(storySliderCurrentSlide);
      }
    });
  
    // Initialize the first slide
    updateStorySliderSlide(storySliderCurrentSlide);
    // end
  
    // slides 14,15,16,17
    const $infoScreen = $(".info-screen"); // Target the specific container
    const $infoScreenSlides = $infoScreen.find(".feedback-design");
    const $infoScreenPrevButton = $infoScreen.find(".prev-button");
    const $infoScreenNextButton = $infoScreen.find(".next-button");
    let infoScreenCurrentSlide = 0;
  
    function infoScreenShowSlide(index) {
      $infoScreenSlides.each(function (i) {
        $(this).toggleClass("active", i === index);
      });
      $infoScreenPrevButton.prop("disabled", index === 0);
      $infoScreenNextButton.prop(
        "disabled",
        index === $infoScreenSlides.length - 1,
      );
    }
  
    $infoScreenPrevButton.on("click", function () {
      if (infoScreenCurrentSlide > 0) {
        infoScreenCurrentSlide--;
        infoScreenShowSlide(infoScreenCurrentSlide);
      }
    });
  
    $infoScreenNextButton.on("click", function () {
      if (infoScreenCurrentSlide < $infoScreenSlides.length - 1) {
        infoScreenCurrentSlide++;
        infoScreenShowSlide(infoScreenCurrentSlide);
      }
    });
  
    infoScreenShowSlide(infoScreenCurrentSlide);
    // end
  
    //slide 6
    $(".survey-feedback-screen .quote").on("click", function () {
      $(".survey-feedback-screen .quote").removeClass("selected"); // Remove selection from other quotes in the same scope
      $(this).addClass("selected"); // Add selection to clicked quote
    });
  
    const $popupScreen = $(".popup-screen"); // Target the specific container
    const $popupScreenStartScreen = $popupScreen.find("#startScreen");
    const $popupScreenOptionsScreen = $popupScreen.find("#optionsScreen");
    const $popupScreenPopups = [
      $popupScreen.find("#popup1"),
      $popupScreen.find("#popup2"),
      $popupScreen.find("#popup3"),
    ];
    const $popupScreenButtons = [
      $popupScreen.find("#button1"),
      $popupScreen.find("#button2"),
      $popupScreen.find("#button3"),
    ];
    const $popupScreenStartNextButton = $popupScreen.find("#startNext");
  
    let popupScreenCurrentPopup = 0;
  
    $popupScreenStartNextButton.on("click", function () {
      $popupScreenStartScreen.fadeOut(300, function () {
        $popupScreenOptionsScreen.fadeIn(300).removeClass("hidden");
      });
    });
  
    function popupScreenShowPopup(index) {
      $popupScreenPopups[index].removeClass("hidden").fadeIn();
      $popupScreenButtons[index].removeClass("highlight");
    }
  
    function popupScreenClosePopup(index) {
      $popupScreenPopups[index].fadeOut(function () {
        $(this).addClass("hidden");
      });
  
      if (index + 1 < $popupScreenButtons.length) {
        $popupScreenButtons[index + 1]
          .prop("disabled", false)
          .addClass("highlight");
      }
    }
  
    $popupScreenButtons.forEach((button, index) => {
      button.on("click", function () {
        popupScreenShowPopup(index);
      });
    });
  
    $popupScreen.find(".close-button").on("click", function () {
      const popupIndex = $popupScreenPopups.findIndex((popup) =>
        popup.is($(this).closest(".popup")),
      );
      popupScreenClosePopup(popupIndex);
    });
  
    // ===== General Slider Functionality (from oppia.js) =====
    const slides = document.querySelectorAll("slide");
    const totalSlides = slides.length;
  
    if (totalSlides > 0) {
      let currentSlide = 0;
      slides[currentSlide].classList.add("active");
      const slide = document.querySelector("slide");
      const sliderContainer = slide.parentNode;
      const slideStyle = window.getComputedStyle(slide);
      const slideWidth =
        slide.offsetWidth +
        parseFloat(slideStyle.marginRight) +
        parseFloat(slideStyle.marginLeft);
  
      if (sliderContainer.getAttribute("pagination") === "true") {
        const pagination = document.createElement("div");
        pagination.classList.add("pagination");
        for (let i = 0; i < totalSlides; i++) {
          const paginationItem = document.createElement("div");
          paginationItem.classList.add("pagination-item");
          pagination.appendChild(paginationItem);
        }
        sliderContainer.appendChild(pagination);
  
        // Position pagination based on container position (desktop only)
        function updatePaginationPosition() {
          if (window.innerWidth >= 768) {
            const rect = sliderContainer.getBoundingClientRect();
            const containerWidth = rect.width;
  
            pagination.style.position = "fixed";
            pagination.style.width = containerWidth * 0.8 + "px";
            pagination.style.left = rect.left + containerWidth * 0.1 + "px";
            pagination.style.top = rect.top + 45 + "px";
          } else {
            // Mobile: reset to default (absolute positioning from CSS)
            pagination.style.position = "";
            pagination.style.width = "";
            pagination.style.left = "";
            pagination.style.top = "";
          }
        }
  
        // Always bind handlers so desktop layout fixes after hydration/resizes
        updatePaginationPosition();
        window.addEventListener("resize", updatePaginationPosition);
        window.addEventListener("scroll", updatePaginationPosition);
        // Re-run after layout settles (fonts/images)
        requestAnimationFrame(updatePaginationPosition);
        setTimeout(updatePaginationPosition, 250);
      }
  
      const paginationItems = document.querySelectorAll(".pagination-item");
      if (paginationItems.length > 0) {
        paginationItems[0].classList.add("active");
      }
  
      function changeSlide(direction) {
        currentSlide = Math.max(
          0,
          Math.min(currentSlide + direction, totalSlides - 1),
        );
  
        slides[currentSlide].classList.add("active");
        if (direction > 0) {
          slides[currentSlide - 1].classList.remove("active");
        } else {
          slides[currentSlide + 1].classList.remove("active");
        }
  
        if (paginationItems.length > 0) {
          if (direction > 0) {
            paginationItems[currentSlide].classList.add("active");
          } else {
            paginationItems[currentSlide + 1].classList.remove("active");
          }
        }
  
        updateSlider();
      }
  
      function updateSlider() {
        // Get the first slide to calculate its total width including margin
        const firstSlide = slides[0];
        const slideStyle = window.getComputedStyle(firstSlide);
        const slideWidth = firstSlide.offsetWidth;
        const marginLeft = parseFloat(slideStyle.marginLeft);
        const marginRight = parseFloat(slideStyle.marginRight);
        const totalSlideWidth = slideWidth + marginLeft + marginRight;
  
        sliderContainer.scroll({
          left: currentSlide * totalSlideWidth,
          behavior: "smooth",
        });
        updateButtonVisibility();
  
        console.log("currentSlide:", currentSlide);
        console.log("slideWidth:", slideWidth);
        console.log("marginLeft:", marginLeft);
        console.log("marginRight:", marginRight);
        console.log("totalSlideWidth:", totalSlideWidth);
        console.log("scrollLeft:", currentSlide * totalSlideWidth);
      }
  
      let touchStartX = 0;
      let touchEndX = 0;
      let touchStartY = 0;
      let touchEndY = 0;
      let mouseStartX = 0;
      let mouseEndX = 0;
      let isMouseDragging = false;
  
      // Touch events
      sliderContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      });
  
      function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
  
        deltaX = touchEndX - touchStartX;
        deltaY = touchEndY - touchStartY;
  
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal Scroll
          if (deltaX < 0) {
            console.log("swipe left");
            changeSlide(1); // Swipe left
          } else {
            console.log("swipe right");
            changeSlide(-1); // Swipe right
          }
        }
      }
  
      sliderContainer.addEventListener("touchcancel", handleTouchEnd);
      sliderContainer.addEventListener("touchend", handleTouchEnd);
  
      // Mouse events for desktop
      sliderContainer.addEventListener("mousedown", (e) => {
        // Don't interfere with audio seek slider dragging
        if (e.target.classList.contains("seek-slider")) {
          return;
        }
        // Don't interfere with any audio player interaction
        if (e.target.closest(".audio-player-container")) {
          return;
        }
        // Don't treat prev/next button clicks as drags - avoids double-advance
        if (e.target.closest?.("#prevBtn, #nextBtn")) {
          return;
        }
        isMouseDragging = true;
        mouseStartX = e.clientX;
        e.preventDefault();
      });
  
      document.addEventListener("mousemove", (e) => {
        if (isMouseDragging) {
          mouseEndX = e.clientX;
        }
      });
  
      document.addEventListener("mouseup", (e) => {
        if (isMouseDragging) {
          mouseEndX = e.clientX;
          const deltaX = mouseEndX - mouseStartX;
  
          if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
              console.log("drag left");
              changeSlide(1); // Drag left
            } else {
              console.log("drag right");
              changeSlide(-1); // Drag right
            }
          }
          isMouseDragging = false;
        }
      });
  
      if (sliderContainer) {
        const prevBtn = document.createElement("div");
        prevBtn.id = "prevBtn";
        prevBtn.innerHTML = "&#10094;";
        prevBtn.addEventListener("click", function () {
          changeSlide(-1);
        });
        prevBtn.addEventListener("touchstart", function (e) {
          e.preventDefault(); // Prevent synthesized click so we don't advance twice
          changeSlide(-1);
        });
        sliderContainer.appendChild(prevBtn);
  
        const nextBtn = document.createElement("div");
        nextBtn.id = "nextBtn";
        nextBtn.innerHTML = "&#10095;";
        nextBtn.addEventListener("click", function () {
          changeSlide(1);
        });
        nextBtn.addEventListener("touchstart", function (e) {
          e.preventDefault(); // Prevent synthesized click so we don't advance twice
          changeSlide(1);
        });
        sliderContainer.appendChild(nextBtn);
  
        // Position buttons based on container position (desktop only)
        let buttonHeightCached = null;
        let prevBtnWidthCached = null;
        let nextBtnWidthCached = null;
  
        function updateButtonPositions() {
          if (window.innerWidth >= 768) {
            // Cache button dimensions on first call
            if (buttonHeightCached === null) {
              buttonHeightCached = prevBtn.offsetHeight;
              prevBtnWidthCached = prevBtn.offsetWidth;
              nextBtnWidthCached = nextBtn.offsetWidth;
            }
  
            const rect = sliderContainer.getBoundingClientRect();
            const containerHeight = rect.height;
            const containerBottom = rect.bottom;
            const containerRight = rect.right;
  
            prevBtn.style.position = "fixed";
            prevBtn.style.left = rect.left + rect.width * 0.1 + "px";
            prevBtn.style.top =
              containerBottom -
              containerHeight * 0.05 -
              buttonHeightCached +
              "px";
            prevBtn.style.transform = "none";
            prevBtn.style.bottom = "";
  
            nextBtn.style.position = "fixed";
            nextBtn.style.left =
              containerRight - rect.width * 0.1 - nextBtnWidthCached + "px";
            nextBtn.style.top =
              containerBottom -
              containerHeight * 0.05 -
              buttonHeightCached +
              "px";
            nextBtn.style.transform = "none";
            nextBtn.style.bottom = "";
          } else {
            // Mobile: reset to default (absolute positioning from CSS)
            prevBtn.style.position = "";
            prevBtn.style.left = "";
            prevBtn.style.top = "";
            prevBtn.style.transform = "";
            prevBtn.style.bottom = "";
  
            nextBtn.style.position = "";
            nextBtn.style.left = "";
            nextBtn.style.right = "";
            nextBtn.style.top = "";
            nextBtn.style.transform = "";
            nextBtn.style.bottom = "";
          }
        }
  
        // Always bind handlers so desktop layout fixes after hydration/resizes
        setTimeout(updateButtonPositions, 100);
        window.addEventListener("resize", updateButtonPositions);
        window.addEventListener("scroll", updateButtonPositions);
        // Re-run after layout settles (fonts/images)
        requestAnimationFrame(updateButtonPositions);
        setTimeout(updateButtonPositions, 250);
  
        function updateButtonVisibility() {
          prevBtn.style.visibility = currentSlide === 0 ? "hidden" : "visible";
          nextBtn.style.visibility =
            currentSlide === totalSlides - 1 ? "hidden" : "visible";
        }
  
        updateButtonVisibility();
      }
    }
    // ===== End General Slider Functionality =====
  
    // ===== Cards Functionality (from oppia.js) =====
    const cards = document.querySelectorAll("card");
  
    if (cards.length > 0) {
      let currentCard = 0;
      cards[0].classList.add("active");
      cards[1].classList.add("next");
  
      $("card").on("click", function () {
        $("card").css({ "pointer-events": "none" });
  
        // Add styles to indicate the card is being clicked
        $("card.active")
          .css({
            transform: "scale(1.7)", // Slightly zoom in
            "background-color": "#ffcccc", // Change background color
            transition: "transform 0.3s ease, background-color 0.3s ease",
          })
          .addClass("animate-leave");
  
        setTimeout(function () {
          $("card.animate-leave")
            .addClass("animate-back")
            .removeClass("animate-leave");
          $("card").parent().prepend($(".animate-back"));
  
          // Reset the active card's transformation
          cards[currentCard].classList.remove("active");
  
          $("card.next").addClass("active").removeClass("next");
          currentCard = (currentCard + 1) % cards.length;
  
          const nextCard = cards[(currentCard + 1) % cards.length];
          nextCard.classList.add("next");
  
          // Add style to the next card to highlight it
          $("card.next").css({
            transform: "scale(1.05)", // Slight zoom in to highlight the next card
            "background-color": "#ccffcc", // Change background color of next card
            transition: "transform 0.3s ease, background-color 0.3s ease",
          });
        }, 300);
  
        setTimeout(function () {
          $("card.animate-back").removeClass("animate-back");
  
          // Reset styles and re-enable pointer events
          $("card").css({
            "pointer-events": "auto",
            transform: "scale(1)", // Reset the scale of all cards
            "background-color": "", // Reset the background color
          });
        }, 700);
      });
    }
    // ===== End Cards Functionality =====
  
    // ===== Know-More Modal Functionality (from oppia.js) =====
    var knowMoreButtons = $("know-more item");
    if (knowMoreButtons.length) {
      var modalFade = $('<div class="modal-fade"></div>')
        .prependTo($("body"))
        .hide();
      knowMoreButtons.find("modal").append('<div class="close"></div>').hide();
  
      knowMoreButtons.on("click", function () {
        var button = $(this);
        var modal = button.find("modal");
  
        var nextBtn = button.next().length
          ? button.next()
          : knowMoreButtons.first();
        knowMoreButtons.removeAttr("highlighted");
        nextBtn.attr("highlighted", true);
  
        modalFade.fadeIn(300);
        modal.show().on("click", function (event) {
          event.stopPropagation();
          modal.hide();
          modalFade.fadeOut();
        });
      });
    }
    // ===== End Know-More Modal Functionality =====
  
    // ===== Noora-Button Toggle Functionality (from oppia.js) =====
    $("noora-button").on("click", function () {
      const clickedButton = $(this);
  
      if (clickedButton.attr("type") === "modal") {
        return;
      }
  
      const color = clickedButton.attr("color");
      if (color === "green") {
        clickedButton.attr("color", "pink");
      } else {
        clickedButton.attr("color", "green");
      }
    });
    // ===== End Noora-Button Toggle Functionality =====
  
    // ===== Audio Player Functionality (from oppia.js) =====
    var currentPlayIcon = null;
  
    $(".audio-player-container").each(function (i, elem) {
      const playerContainer = $(elem);
      const playIcon = playerContainer.find(".play-icon");
      const seekSlider = playerContainer.find(".seek-slider")[0];
      let playState = "play";
  
      /* Implementation of the functionality of the audio player */
  
      const audio = playerContainer.find("audio")[0];
      const duration = playerContainer.find(".duration");
      let raf = null;
  
      playIcon.on("click", () => {
        if (playState === "play") {
          if (currentPlayIcon != null) {
            currentPlayIcon.click();
          }
          playIcon.removeClass("pause");
          playIcon.addClass("play");
          audio.play();
          requestAnimationFrame(whilePlaying);
          playState = "pause";
          currentPlayIcon = playIcon;
        } else {
          playIcon.removeClass("play");
          playIcon.addClass("pause");
          audio.pause();
          cancelAnimationFrame(raf);
          playState = "play";
          currentPlayIcon = null;
        }
      });
  
      $(seekSlider)
        .on("input", (e) => {
          rangeInput = e.target;
          if (rangeInput === seekSlider) {
            playerContainer.css(
              "--seek-before-width",
              (rangeInput.value / rangeInput.max) * 100 + "%",
            );
          }
          duration.text(calculateTime(audio.duration - seekSlider.value));
          if (!audio.paused) {
            cancelAnimationFrame(raf);
          }
        })
        .on("change", () => {
          audio.currentTime = seekSlider.value;
          if (!audio.paused) {
            requestAnimationFrame(whilePlaying);
          }
        });
  
      const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
      };
  
      const displayDuration = () => {
        duration.text(calculateTime(audio.duration));
      };
  
      const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
      };
  
      const displayBufferedAmount = () => {
        const bufferedAmount = Math.floor(
          audio.buffered.end(audio.buffered.length - 1),
        );
        playerContainer.css(
          "--buffered-width",
          `${(bufferedAmount / seekSlider.max) * 100}%`,
        );
      };
  
      const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        duration.text(calculateTime(audio.duration - seekSlider.value));
        playerContainer.css(
          "--seek-before-width",
          `${(seekSlider.value / seekSlider.max) * 100}%`,
        );
        raf = requestAnimationFrame(whilePlaying);
      };
  
      if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
      } else {
        audio.addEventListener("loadedmetadata", () => {
          displayDuration();
          setSliderMax();
          displayBufferedAmount();
        });
      }
  
      audio.addEventListener("progress", displayBufferedAmount);
  
      audio.addEventListener("ended", () => {
        playIcon.removeClass("play");
        playIcon.addClass("pause");
        cancelAnimationFrame(raf);
        playState = "play";
        currentPlayIcon = null;
        seekSlider.value = 0;
        playerContainer.css("--seek-before-width", "0%");
        duration.text(calculateTime(audio.duration));
      });
    });
    // ===== End Audio Player Functionality =====
  
    // ===== Multi-Content Section Navigation =====
    // Automatically detect containers with multiple <content> sections and add slide navigation
    // Uses existing #prevBtn/#nextBtn pattern from the SCSS styles
  
    // Find all containers that have multiple <content> children (not inside card elements)
    $(
      "info-section, noor-section, content-section, feedback-section, activity-section",
    ).each(function () {
      const $container = $(this);
      const $contentSections = $container.find("> content");
  
      // Only add navigation if there are multiple content sections and no existing nav buttons
      if (
        $contentSections.length > 1 &&
        $container.find("#prevBtn, #nextBtn").length === 0
      ) {
        let currentIndex = 0;
  
        // Wrap content sections in a slider container if not already wrapped
        if ($container.find("#slider-container").length === 0) {
          $contentSections.wrapAll('<div id="slider-container"></div>');
        }
  
        const $sliderContainer = $container.find("#slider-container");
  
        // Add navigation buttons using existing styles
        $container.append('<button id="prevBtn">←</button>');
        $container.append('<button id="nextBtn">→</button>');
  
        const $prevBtn = $container.find("#prevBtn");
        const $nextBtn = $container.find("#nextBtn");
  
        // Initially hide prev button
        $prevBtn.hide();
  
        // Function to show a specific slide
        function showSlide(index) {
          if (index < 0 || index >= $contentSections.length) return;
  
          currentIndex = index;
  
          // Slide the container
          const slideWidth = 100; // 100vw per slide
          $sliderContainer.css(
            "transform",
            `translateX(-${index * slideWidth}vw)`,
          );
  
          // Update button visibility
          $prevBtn.toggle(index > 0);
          $nextBtn.toggle(index < $contentSections.length - 1);
        }
  
        // Button click handlers
        $prevBtn.on("click", function () {
          if (currentIndex > 0) {
            showSlide(currentIndex - 1);
          }
        });
  
        $nextBtn.on("click", function () {
          if (currentIndex < $contentSections.length - 1) {
            showSlide(currentIndex + 1);
          }
        });
  
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
  
        $sliderContainer.on("touchstart", function (e) {
          touchStartX = e.originalEvent.touches[0].clientX;
        });
  
        $sliderContainer.on("touchend", function (e) {
          touchEndX = e.originalEvent.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
  
          if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < $contentSections.length - 1) {
              // Swipe left - next
              showSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
              // Swipe right - previous
              showSlide(currentIndex - 1);
            }
          }
        });
  
        // Initialize first slide
        showSlide(0);
      }
    });
    // ===== End Multi-Content Section Navigation =====
  });
  
  // ===== Change Audio Source Function (from oppia.js) =====
  function changeAudioSource(newSource) {
    $("audio").each(function (i, audioElement) {
      audioElement.src =
        newSource + audioElement.src.replace("file:///audio/", "");
      audioElement.load();
    });
  }