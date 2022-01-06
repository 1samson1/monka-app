import $ from "jquery";
import { createEmitter } from '@/plugins/emitter'
import Replacer from './replacer'
import mitt from 'mitt'

export default class Initter {

    constructor(app, store){
        this.app = app
        this.store = store
        this.insertable = null
        this.emitter = mitt()
        this.replacer = new Replacer()
        this.replacer.emotes = []

        this.bindEvents()
        this.initApp()
        this.initStore()
    }

    initApp(){
        let _this = this

        this.app.use(this.store)
        this.app.use(createEmitter(this.emitter))

        $(function(){
            _this.$appBox = $('<div class="monka__box show"><div class="mk-app"></div></div>'),
                 
            _this.app.mount( $('.mk-app', _this.$appBox)[0])

            $('body').append(_this.$appBox)

            _this.initObserver()
            _this.insertBtns()
        })
    }

    initStore(){
        this.store.subscribe( (mutation, state) => {
            const listenMutations = [
                'setBetterTTVEmotes',
                'setFrankerFacezEmotes',
                'setTwitchEmotes',
                'removeEmotes'
            ]
        
            if(listenMutations.includes(mutation.type)){
                this.onAddEmotes()
            }
        })
        
        this.store.dispatch('fetchEmotes')
            .then(() => {
                console.log('All emotes loaded')
            })
    }

    insertBtns(){
        let _this = this,
            container = $('.im-chat-input--textarea')


        container.filter(function(){
            return !($(this).find('.monka__smiles'))
        }).each( function (){
            let textarea = $('.im_editable', $(this)),
                buttons = $('.im_chat-input--buttons', $(this)),
                btn = $('<div class="monka__smiles"><div class="monka__icon"></div>	</div>')

            textarea.css('padding-right', buttons.outerWidth())
            
            btn.on('click', function (e) {
                if( _this.$appBox.hasClass('show')) return  _this.$appBox.removeClass('show')

                 _this.$appBox.offset({
                    top: $(this).offset().top -  _this.$appBox.outerHeight(),
                    left: $(this).offset().left -  _this.$appBox.outerWidth() + $(this).outerWidth(),
                })

                 _this.$appBox.addClass('show')	

                 _this.insertable = textarea
            })
            
            btn.insertAfter($('.im-chat-input--attach', buttons))
        })
    }

    initObserver(){
        this.observer = new MutationObserver( () => {
            console.log('Observer');
            this.replacer.startReplaceLoop()
            this.insertBtns()
        })	

        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true,
        })
    }

    bindEvents(){
        this.emitter.on('insert-emote', code => {
            this.insertable.text( this.insertable.text() + code )
        })
    }

    onAddEmotes(){
        this.replacer.emotes = this.store.getters.getEmotes
        console.log('Store');
        this.replacer.startReplaceLoop()
    }
}
