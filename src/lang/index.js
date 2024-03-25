import { createI18n } from 'vue-i18n'
import en from './en'
import fr from './fr'
import ar from './ar'
import hi from './hi'
import pt from './po'
import es from './sp'

const i18n = createI18n({
    legacy: false,
    // 定义的语言 
    locale: localStorage.getItem('lang') || "en",
    // 引入各种不同的配置，可直接写在这里
    messages: {
        en,
        fr,
        ar,
        hi,
        pt,
        es
    },
    globalInjection: true
    // silentTranslationWarn: true, // 去除警告
    // messages: { ...messages },
})
export default i18n