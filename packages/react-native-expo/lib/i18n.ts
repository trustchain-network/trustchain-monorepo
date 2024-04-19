import { I18n } from "i18n-js";
import en from "../translations/en.json";
import id from "../translations/id.json";
import es from "../translations/es.json";
import nl from "../translations/nl.json";
import cn from "../translations/cn.json";

const i18n: I18n = new I18n({
  en,
  id,
  es,
  nl,
  cn,
});

i18n.locale = "en";

export default i18n;
