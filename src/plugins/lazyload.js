export default {
    install: (app, oprions) => {
        const standart = {
            root: null,
            rootMargin: "0px",
            threshold: 1,
        }

        const observer = new IntersectionObserver( (entries, observer) => {
            entries.forEach( entry => {
                if(entry.isIntersecting){
                    entry.target.src = entry.target.dataset.src

                    observer.unobserve(entry.target)
                }

            })
        }, Object.assign(standart, oprions))

        app.directive('lazy', {
            mounted(el){
                observer.observe(el)
            },
            unmounted(el){
                observer.unobserve(el)
            }
        })
    }
}