const App = {
    data() {
        return {
            inputValue: '',
            notesList: [],
            deletedNotesList: [],

            lastItemDeleted: '',
            lastIndexDeleted: 0,
            editItemIndex: 0,

            saveBtnVisible: 'btn primary invisible',
            cancelBtnVisible: 'btn primary invisible danger',
            addBtnVisible: 'btn primary visible',
            revertBtnClickable: false,

            toolTipText: 'Максимальная длина названия - 50 символов!',
            toolTipVisible: false,
            revertChangesVisible: false,

            currentLanguage: 'Russian',

            titleText: 'Заметки',
            placeholderText: 'Введите название заметки',
            addBtnText: 'Добавить',
            saveBtnText: 'Сохранить',
            editBtnText: 'Редактировать',
            deleteBtnText: 'Удалить',
            cancelBtnText: 'Отменить',
            allNotesText: 'Всего заметок',
            noNotesYetText: 'Заметок пока нет.',
            wasRemovedText: 'Заметка была удалена'
        }
    },
    mounted() {
        if ($cookies.get('cookiesNotesList')) {
            this.notesList = JSON.parse(window.$cookies.get('cookiesNotesList'))
        }
        if ($cookies.get('cookiesLanguage')) {
            if ($cookies.get('cookiesLanguage') === 'Russian') {
                this.changeLanguageToRu()
            }
            if ($cookies.get('cookiesLanguage') === 'English') {
                this.changeLanguageToEng()
            }
        }
    },
    methods: {
        changeLanguageToEng() {
            this.titleText = 'Notes'
            this.placeholderText = 'Enter note title...'
            this.addBtnText = 'Create'
            this.saveBtnText = 'Save'
            this.editBtnText = 'Edit'
            this.deleteBtnText = 'Delete'
            this.cancelBtnText = 'Cancel'
            this.allNotesText = 'All notes'
            this.noNotesYetText = 'No any notes.'
            this.wasRemovedText = 'Note was deleted'
            this.currentLanguage = 'English'
            window.$cookies.set('cookiesLanguage', this.currentLanguage)
        },
        changeLanguageToRu() {
            this.titleText = 'Заметки'
            this.placeholderText = 'Введите название заметки'
            this.addBtnText = 'Добавить'
            this.saveBtnText = 'Сохранить'
            this.editBtnText = 'Редактировать'
            this.deleteBtnText = 'Удалить'
            this.cancelBtnText = 'Отменить'
            this.allNotesText = 'Всего заметок'
            this.noNotesYetText = 'Заметок пока нет.'
            this.wasRemovedText = 'Заметка была удалена'
            this.currentLanguage = 'Russian'
            window.$cookies.set('cookiesLanguage', this.currentLanguage)
        },
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