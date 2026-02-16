document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // INITIALIZE ALL SEGMENTED CONTROLS
  // ============================================
  const allWrappers = document.querySelectorAll(
    '.segments-wrapper[data-segment-control]',
  )

  allWrappers.forEach((wrapper) => {
    initSegmentedControl(wrapper)
  })

  // ============================================
  // SEGMENTED CONTROL INITIALIZER
  // ============================================
  function initSegmentedControl(segmentsWrapper) {
    const tnMolecule = segmentsWrapper.querySelector('.tn-molecule')

    const controlName = segmentsWrapper.dataset.segmentControl
    const contentPrefix = `uc-${controlName}`
    const segmentButtons = tnMolecule.querySelectorAll('.segment-btn')
    const buttonCount = segmentButtons.length

    const sliderStyles = segmentConfig[controlName] || segmentConfig['default']

    const config = {
      slider: {
        backgroundColor: sliderStyles.backgroundColor,
        boxShadow: sliderStyles.boxShadow,
        transitionDuration: sliderStyles.transitionDuration * 1000,
        transitionTimingFunction: sliderStyles.easing,
      },
    }

    let activeIndex = 0
    const wrapperRadius = parseFloat(getComputedStyle(tnMolecule).borderRadius)
    const wrapperPadding = parseFloat(getComputedStyle(tnMolecule).padding)
    let sliderRadius = wrapperRadius - wrapperPadding
    sliderRadius = Math.max(sliderRadius, 2);

    // ============================================
    // SLIDER CREATION
    // ============================================
    function createSlider() {
      const slider = document.createElement('div')
      slider.classList.add('segments-slider')
      console.log('SEGMENTS by AG Design');
      Object.assign(slider.style, {
        position: 'absolute',
        height: `calc(100% - ${wrapperPadding * 2}px)`,
        top: '50%',
        transform: 'translateY(-50%)',
        left: `${wrapperPadding}px`,
        borderRadius: `${sliderRadius}px`,
        backgroundColor: config.slider.backgroundColor,
        boxShadow: config.slider.boxShadow,
        transitionDuration: `${config.slider.transitionDuration}ms`,
        transitionTimingFunction: config.slider.transitionTimingFunction,
        zIndex: 1,
      })
      tnMolecule.appendChild(slider)
      return slider
    }

    // ============================================
    // CONTENT SWITCHER
    // ============================================
    function switchContent(index, shouldAnimate = false) {
      for (let i = 0; i < buttonCount; i++) {
        const section = document.querySelector(`.${contentPrefix}-${i + 1}`)
        if (!section) continue

        if (i === index) {
          section.style.display = 'block'

          // Animate only if config allows AND caller wants animation
          if (segmentConfig.contentAnimate.isAnimation && shouldAnimate) {
            section.style.opacity = segmentConfig.contentAnimate.opacity
            section.animate(
              [
                { opacity: segmentConfig.contentAnimate.opacity },
                { opacity: 1 },
              ],
              {
                duration: segmentConfig.contentAnimate.transitionDuration * 1000,
                easing: segmentConfig.contentAnimate.easing,
                fill: 'forwards',
              },
            )
          } else {
            section.style.opacity = '1'
          }
        } else {
          section.style.display = 'none'
          section.style.opacity = '1'
        }
      }
    }

    // ============================================
    // MOVE SLIDER
    // ============================================
    function moveSlider(slider, button, index, animateContent = false) {
      slider.style.width = `${button.offsetWidth}px`
      slider.style.left = `${button.offsetLeft}px`
      switchContent(index, animateContent)
    }

    // ============================================
    // EVENT HANDLERS
    // ============================================
    function attachEventListeners(slider) {
      segmentButtons.forEach((button, index) => {
        button.style.cursor = 'pointer'
        button.style.position = 'relative'
        button.style.zIndex = 2

        button.addEventListener('click', (e) => {
          e.preventDefault()

          // Remove 'active' from all buttons and enable clicks
          segmentButtons.forEach((btn) => {
            btn.classList.remove('active')
            btn.style.pointerEvents = 'auto'
          })

          // Set clicked button as active and disable further clicks
          button.classList.add('active')
          button.style.pointerEvents = 'none'

          activeIndex = index
          moveSlider(slider, button, index, true) // animate only on click
        })
      })

      // === Set first button active immediately ===
      const firstButton = segmentButtons[0]
      firstButton.classList.add('active')
      firstButton.style.pointerEvents = 'none'
      activeIndex = 0
      moveSlider(slider, firstButton, 0, false) // optional: animate = false
    }

    function handleResize(slider) {
      window.addEventListener('resize', () => {
        if (segmentButtons[activeIndex]) {
          moveSlider(slider, segmentButtons[activeIndex], activeIndex, false)
        }
      })
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    const slider = createSlider()
    attachEventListeners(slider)
    handleResize(slider)
    moveSlider(slider, segmentButtons[0], 0, false)
  }
})
