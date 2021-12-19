let containerSections = document.querySelector('.sections'),
    sections = document.querySelectorAll('.section'),
    toSections = document.querySelectorAll('.to-section'),
    currentActive = '';

containerSections.addEventListener('scroll', onScroll.bind(containerSections));
containerSections.addEventListener('changeActive', onChangeActive.bind(containerSections));
onScroll.call(containerSections);

toSections.forEach( el => {
    el.addEventListener('click', onClickToSec.bind(el));
})

function onChangeActive(e){
    toSections.forEach( el => {
        el.classList.remove('active');

        if(el.dataset.toSection == currentActive){
            el.classList.add('active')
        }
    })
}

function onScroll(){    
    
    if( this.scrollOff ) return;    
    
    let cur_pos = this.scrollTop;    

    sections.forEach( el => {
        let top = el.offsetTop - 30,
            bottom = top + el.offsetHeight;        
        
        if (top <= cur_pos && cur_pos < bottom && currentActive != el.dataset.section){
            currentActive = el.dataset.section

            this.dispatchEvent(new CustomEvent('changeActive', { detail: { active: currentActive } }))
        }
    })
    
}

function onClickToSec(e){
    let section = containerSections.querySelector('[data-section=' + this.dataset.toSection + ']');

    e.preventDefault();

    containerSections.scrollOff = true;
    gsap.to(containerSections, { 
        duration: 0.5, 
        onComplete: () => { this.scrollOff = false },
        scrollTop: section.offsetTop 
    })    
    
    toSections.forEach(el => {
        el.classList.remove('active');
    })

    currentActive = this.dataset.toSection;

    this.classList.add('active')
}
