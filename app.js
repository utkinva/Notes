const App = {
    data() {
        return {
            title: 'Заметки',
            placeholderText: 'Введите название заметки',
            inputValue: '',
            notesList: [],
            deletedNotesList: [],
            lastItemDeleted: '',
            lastIndexDeleted: 0,
            revertBtnClickable: false,
            editItemIndex: 0,
            saveBtnVisible: 'btn primary invisible',
            cancelBtnVisible: 'btn primary invisible danger',
            addBtnVisible: 'btn primary visible',
            toolTipText: 'Максимальная длина названия - 50 символов!',
            toolTipVisible: false,
            revertChangesVisible: false
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
        hideRevertChanges() {
            setTimeout(() => this.revertChangesVisible = false, 2500)
        },
        revertChanges() {
            if (!this.revertBtnClickable) {
                this.notesList.splice(this.lastIndexDeleted,0, this.lastItemDeleted)
                this.addToCookies()
            }
            this.revertBtnClickable = true
            this.revertChangesVisible = false

        },
        deleteNote(i) {
            this.revertBtnClickable = false
            this.lastIndexDeleted = i
            this.lastItemDeleted = this.notesList[i]
            this.notesList.splice(i,1)
            this.deletedNotesList.push(this.notesList[i])
            this.inputValue = ''
            this.addBtnVisible = 'btn primary visible'
            this.saveBtnVisible = 'btn primary invisible'
            this.cancelBtnVisible = 'btn primary invisible danger'
            this.revertChangesVisible = true
            this.hideRevertChanges()
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