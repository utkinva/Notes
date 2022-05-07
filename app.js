const App = {
    data() {
        return {
            title: 'Заметки',
            placeholderText: 'Введите название заметки',
            inputValue: '',
            notesList: [],
            editItemIndex: 0,
            saveBtnVisible: 'btn primary invisible',
            cancelBtnVisible: 'btn primary invisible danger',
            addBtnVisible: 'btn primary visible',
            toolTipText: 'Максимальная длина названия - 50 символов!',
            toolTipVisible: false
        }
    },
    mounted() {
        if ($cookies.get('cookiesNotesList')){
            this.notesList = JSON.parse(window.$cookies.get('cookiesNotesList'))
        }

    },
    methods: {
        addToCookies() {
            window.$cookies.set('cookiesNotesList',JSON.stringify(this.notesList))

            this.notesList = JSON.parse(window.$cookies.get('cookiesNotesList'))
        },
        addNewNote() {
            if (this.inputValue.length !== 0) {
                this.notesList.push(this.inputValue)
                this.inputValue = ''
                this.addToCookies()
            }

        },
        deleteNote(i) {
            this.notesList.splice(i,1)
            this.inputValue = ''
            this.addBtnVisible = 'btn primary visible'
            this.saveBtnVisible = 'btn primary invisible'
            this.cancelBtnVisible = 'btn primary invisible danger'
            this.addToCookies()
        },
        editNote(i) {
            this.editItemIndex = i
            this.inputValue = this.notesList[this.editItemIndex]
            this.addBtnVisible = 'btn primary invisible'
            this.saveBtnVisible = 'btn primary visible'
            this.cancelBtnVisible = 'btn primary visible danger'
        },
        saveChanges() {
            if (this.inputValue.length !== 0) {
                this.notesList[this.editItemIndex] = this.inputValue
                this.addBtnVisible = 'btn primary visible'
                this.saveBtnVisible = 'btn primary invisible'
                this.cancelBtnVisible = 'btn primary invisible danger'
                this.inputValue = ''
                this.addToCookies()
            }
        },
        cancelBtn() {
            this.inputValue = ''
            this.addBtnVisible = 'btn primary visible'
            this.saveBtnVisible = 'btn primary invisible'
            this.cancelBtnVisible = 'btn primary invisible danger'
        },

    },
    watch: {
        inputValue() {
            if (this.inputValue.length === 50) {
                this.toolTipVisible = true
            }
            else{
                this.toolTipVisible = false
            }
        },
        notesList(newNotesList) {
            localStorage.notesList = newNotesList;
        }
    }
}


Vue.createApp(App).mount('#app')