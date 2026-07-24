import type { Locale } from "@/types/domain";

export const LEGAL_ENTITY = {
  name: "Vwayaj ayisyen",
  type: "Ltda.",
  country: "Brasil",
  publicAddress: "São Paulo, Brasil",
  email: {
    support: "support@vwayajayisyen.com",
    legal: "legal@vwayajayisyen.com",
    marketing: "promo@vwayajayisyen.com"
  }
} as const;

export const LEGAL_VERSIONS = {
  terms: "terms-2026-07-23-v1",
  privacy: "privacy-2026-07-23-v1",
  cookies: "cookies-2026-07-23-v1"
} as const;

export const PUBLISHED_LEGAL_DOCUMENTS = ["terms", "privacy", "cookies"] as const;
export type PublishedLegalDocument = (typeof PUBLISHED_LEGAL_DOCUMENTS)[number];
export type OfficialLegalLocale = "es" | "pt";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
};

export type LegalDocumentContent = {
  title: string;
  kicker: string;
  summary: string;
  version: string;
  effectiveDate: string;
  updatedLabel: string;
  versionLabel: string;
  languageNotice: string;
  languageLabel: string;
  contactTitle: string;
  sections: readonly LegalSection[];
};

const spanishTerms: LegalDocumentContent = {
  title: "Términos de uso y servicio",
  kicker: "Documento legal oficial",
  summary:
    "Estos Términos regulan el acceso y uso de Vwayaj Ayisyen. La plataforma ofrece información y herramientas de preparación; no es una autoridad pública ni garantiza resultados migratorios, laborales o de viaje.",
  version: LEGAL_VERSIONS.terms,
  effectiveDate: "23 de julio de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versión",
  languageLabel: "Idiomas jurídicos oficiales",
  languageNotice:
    "Las versiones en español y portugués son oficiales y se consideran equivalentes. Las traducciones de interfaz a otros idiomas son únicamente de cortesía.",
  contactTitle: "Contacto legal y soporte",
  sections: [
    {
      id: "operator",
      title: "1. Operador e identificación",
      paragraphs: [
        `Vwayaj Ayisyen es operada por ${LEGAL_ENTITY.name}, entidad de tipo ${LEGAL_ENTITY.type} en ${LEGAL_ENTITY.country}, con domicilio público en ${LEGAL_ENTITY.publicAddress}.`,
        `Soporte general: ${LEGAL_ENTITY.email.support}. Asuntos legales y de privacidad: ${LEGAL_ENTITY.email.legal}. Comunicaciones promocionales: ${LEGAL_ENTITY.email.marketing}.`
      ]
    },
    {
      id: "acceptance",
      title: "2. Aceptación y alcance",
      paragraphs: [
        "Al acceder al sitio puedes consultar contenido público. Para crear una cuenta, cuando el registro esté habilitado, deberás aceptar expresamente la versión vigente de estos Términos y de la Política de Privacidad.",
        "La aceptación queda asociada a la cuenta, fecha, idioma y versión del documento. Si no estás de acuerdo, no crees una cuenta ni uses funciones privadas."
      ]
    },
    {
      id: "eligibility",
      title: "3. Edad y capacidad",
      paragraphs: [
        "Las cuentas están destinadas a personas de 18 años o más con capacidad legal para aceptar estos Términos. No permitimos que menores contraten servicios, creen una cuenta o carguen documentos por sí solos.",
        "Si en el futuro un servicio requiere datos de un menor, sólo se tratarán mediante su representante legal, con información y controles adicionales."
      ]
    },
    {
      id: "nature",
      title: "4. Naturaleza del servicio",
      paragraphs: [
        "Vwayaj Ayisyen publica guías, comparaciones, herramientas de preparación y orientación general para la comunidad haitiana. El contenido es informativo y puede resumir fuentes de terceros.",
        "No somos una embajada, consulado, oficina de inmigración, autoridad laboral ni organismo gubernamental. Tampoco afirmamos estar asociados con esas entidades salvo que una relación concreta se identifique expresamente."
      ]
    },
    {
      id: "no-advice",
      title: "5. Sin asesoría profesional ni resultados garantizados",
      paragraphs: [
        "El contenido general no sustituye asesoría jurídica, migratoria, fiscal, médica, financiera o de otro profesional autorizado. Las decisiones dependen de las circunstancias personales y de reglas que pueden cambiar.",
        "No garantizamos visas, permisos, empleo, admisión, plazos, precios de terceros ni decisiones de autoridades. Para un caso individual, consulta fuentes oficiales y un profesional autorizado en la jurisdicción correspondiente."
      ]
    },
    {
      id: "sources",
      title: "6. Fuentes, vigencia y correcciones",
      paragraphs: [
        "Procuramos identificar fuentes y fechas de revisión cuando publicamos contenido sustantivo. Una página puede quedar desactualizada antes de su próxima revisión.",
        "Verifica siempre los requisitos vigentes en la fuente oficial antes de actuar. Puedes comunicar errores a support@vwayajayisyen.com."
      ]
    },
    {
      id: "accounts",
      title: "7. Cuentas y seguridad",
      paragraphs: [
        "Debes proporcionar información exacta, mantener tus credenciales en secreto y avisarnos si sospechas acceso no autorizado. Eres responsable de la actividad legítimamente atribuible a tu cuenta, salvo lo que disponga la ley obligatoria.",
        "Podemos aplicar verificación de correo, CAPTCHA, autenticación multifactor, cierre de sesiones y otros controles proporcionales para proteger la plataforma."
      ]
    },
    {
      id: "sensitive-data",
      title: "8. Datos y documentos sensibles",
      paragraphs: [
        "No envíes pasaportes, identificaciones, expedientes migratorios, datos bancarios, información médica u otros datos sensibles por correo electrónico, formularios públicos o canales promocionales.",
        "La carga de documentos permanece deshabilitada. Si se habilita, mostraremos antes la finalidad, el acceso, la retención y el consentimiento aplicable dentro de un canal protegido."
      ]
    },
    {
      id: "availability",
      title: "9. Funciones disponibles",
      paragraphs: [
        "La disponibilidad real de cada función se indica en la interfaz. En la fecha de esta versión, pagos, contratación de servicios pagados, carga de documentos, asistente de IA, comunidad, citas y portal profesional no están habilitados para el público.",
        "Una vista previa, etiqueta o descripción futura no constituye una oferta, contratación ni promesa de disponibilidad."
      ]
    },
    {
      id: "third-parties",
      title: "10. Servicios y enlaces de terceros",
      paragraphs: [
        "Podemos enlazar autoridades, proveedores o sitios externos. No controlamos su contenido, disponibilidad, precios, decisiones ni prácticas de privacidad.",
        "Las condiciones del tercero se aplican cuando lo utilizas. Un enlace no implica recomendación, sociedad o garantía."
      ]
    },
    {
      id: "communications",
      title: "11. Comunicaciones",
      paragraphs: [
        "Podemos enviarte mensajes operativos necesarios para seguridad, verificación de cuenta y prestación de una función solicitada. Estos mensajes no son promocionales.",
        `El marketing será opcional, separado y enviado desde o administrado mediante ${LEGAL_ENTITY.email.marketing}. Podrás retirar tu autorización en cualquier momento sin perder el acceso básico.`
      ]
    },
    {
      id: "acceptable-use",
      title: "12. Uso permitido",
      paragraphs: ["No puedes usar Vwayaj Ayisyen para:"],
      items: [
        "infringir leyes, derechos de terceros o controles de acceso;",
        "suplantar identidades, presentar información fraudulenta o explotar a personas vulnerables;",
        "extraer datos de forma abusiva, distribuir malware o interferir con la seguridad;",
        "publicar contenido ilegal, discriminatorio, amenazante o que revele datos personales ajenos;",
        "presentar la información de la plataforma como asesoría oficial o garantía de un resultado."
      ]
    },
    {
      id: "intellectual-property",
      title: "13. Propiedad intelectual",
      paragraphs: [
        "La marca, diseño, textos originales, software y demás materiales propios están protegidos por las leyes aplicables. Te concedemos una licencia limitada, personal, revocable y no transferible para usar la plataforma conforme a estos Términos.",
        "Las fuentes, marcas y contenidos de terceros pertenecen a sus respectivos titulares. Las citas y enlaces se ofrecen con finalidad informativa."
      ]
    },
    {
      id: "suspension",
      title: "14. Suspensión, cambios y continuidad",
      paragraphs: [
        "Podemos limitar o suspender una cuenta cuando sea razonablemente necesario por seguridad, fraude, incumplimiento o exigencia legal, aplicando las garantías obligatorias que correspondan.",
        "Podemos modificar, mantener o retirar funciones. Procuraremos avisar con antelación cuando un cambio material afecte derechos o datos, salvo urgencia técnica, de seguridad o legal."
      ]
    },
    {
      id: "warranties",
      title: "15. Disponibilidad y responsabilidad",
      paragraphs: [
        "La plataforma se proporciona con esfuerzos razonables de disponibilidad y exactitud, pero puede contener interrupciones, errores o información desactualizada. Nada en estos Términos excluye garantías o derechos que la ley no permita renunciar.",
        "No establecemos un límite monetario fijo en USD. Cualquier responsabilidad se determinará conforme a la ley obligatoria aplicable, la causalidad y las circunstancias del caso. No excluimos responsabilidad que legalmente no pueda limitarse, incluyendo dolo, fraude o derechos inderogables del consumidor y de protección de datos."
      ]
    },
    {
      id: "law",
      title: "16. Ley aplicable y resolución de conflictos",
      paragraphs: [
        "Estos Términos se rigen por las leyes de Brasil y por las normas obligatorias de protección al consumidor, privacidad y demás materias que resulten aplicables según el país y la situación del usuario.",
        "Antes de acudir a tribunales, puedes escribir a legal@vwayajayisyen.com para buscar una solución. Cuando sea legalmente válido, los tribunales de São Paulo, Brasil, serán competentes, sin privar al consumidor del foro u otros derechos que una norma obligatoria le reconozca."
      ]
    },
    {
      id: "changes",
      title: "17. Cambios y contacto",
      paragraphs: [
        "Publicaremos la fecha y versión de cada actualización. Si un cambio material requiere nueva aceptación, la solicitaremos antes de continuar con la función afectada.",
        "Consultas sobre estos Términos: legal@vwayajayisyen.com. Soporte general: support@vwayajayisyen.com."
      ]
    }
  ]
};

const portugueseTerms: LegalDocumentContent = {
  title: "Termos de uso e serviço",
  kicker: "Documento jurídico oficial",
  summary:
    "Estes Termos regulam o acesso e o uso da Vwayaj Ayisyen. A plataforma oferece informações e ferramentas de preparação; não é uma autoridade pública e não garante resultados migratórios, profissionais ou de viagem.",
  version: LEGAL_VERSIONS.terms,
  effectiveDate: "23 de julho de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versão",
  languageLabel: "Idiomas jurídicos oficiais",
  languageNotice:
    "As versões em português e espanhol são oficiais e consideradas equivalentes. Traduções da interface para outros idiomas são oferecidas apenas por cortesia.",
  contactTitle: "Contato jurídico e suporte",
  sections: [
    {
      id: "operator",
      title: "1. Operador e identificação",
      paragraphs: [
        `A Vwayaj Ayisyen é operada por ${LEGAL_ENTITY.name}, entidade do tipo ${LEGAL_ENTITY.type} no ${LEGAL_ENTITY.country}, com domicílio público em ${LEGAL_ENTITY.publicAddress}.`,
        `Suporte geral: ${LEGAL_ENTITY.email.support}. Assuntos jurídicos e de privacidade: ${LEGAL_ENTITY.email.legal}. Comunicações promocionais: ${LEGAL_ENTITY.email.marketing}.`
      ]
    },
    {
      id: "acceptance",
      title: "2. Aceitação e alcance",
      paragraphs: [
        "Ao acessar o site, você pode consultar conteúdo público. Para criar uma conta, quando o cadastro estiver disponível, será necessário aceitar expressamente a versão vigente destes Termos e da Política de Privacidade.",
        "A aceitação fica vinculada à conta, data, idioma e versão do documento. Se você não concordar, não crie uma conta nem use áreas privadas."
      ]
    },
    {
      id: "eligibility",
      title: "3. Idade e capacidade",
      paragraphs: [
        "As contas são destinadas a pessoas com 18 anos ou mais e capacidade legal para aceitar estes Termos. Menores não podem contratar serviços, criar conta ou enviar documentos por conta própria.",
        "Se um serviço futuro exigir dados de menor, o tratamento ocorrerá apenas por meio de seu representante legal, com informações e controles adicionais."
      ]
    },
    {
      id: "nature",
      title: "4. Natureza do serviço",
      paragraphs: [
        "A Vwayaj Ayisyen publica guias, comparações, ferramentas de preparação e orientações gerais para a comunidade haitiana. O conteúdo é informativo e pode resumir fontes de terceiros.",
        "Não somos embaixada, consulado, órgão de imigração, autoridade trabalhista ou órgão governamental. Também não afirmamos parceria com essas entidades, salvo quando uma relação específica for expressamente identificada."
      ]
    },
    {
      id: "no-advice",
      title: "5. Sem assessoria profissional ou resultado garantido",
      paragraphs: [
        "O conteúdo geral não substitui assessoria jurídica, migratória, fiscal, médica, financeira ou de outro profissional habilitado. Decisões dependem das circunstâncias pessoais e de regras que podem mudar.",
        "Não garantimos vistos, autorizações, emprego, admissão, prazos, preços de terceiros ou decisões de autoridades. Para um caso individual, consulte fontes oficiais e profissional habilitado na jurisdição correspondente."
      ]
    },
    {
      id: "sources",
      title: "6. Fontes, vigência e correções",
      paragraphs: [
        "Buscamos identificar fontes e datas de revisão quando publicamos conteúdo substancial. Uma página pode ficar desatualizada antes da próxima revisão.",
        "Sempre confirme os requisitos vigentes na fonte oficial antes de agir. Erros podem ser comunicados a support@vwayajayisyen.com."
      ]
    },
    {
      id: "accounts",
      title: "7. Contas e segurança",
      paragraphs: [
        "Você deve fornecer informações corretas, manter suas credenciais em sigilo e nos avisar se suspeitar de acesso não autorizado. Você responde pela atividade legitimamente atribuível à sua conta, ressalvado o que determinar a lei obrigatória.",
        "Podemos usar verificação de e-mail, CAPTCHA, autenticação multifator, encerramento de sessões e outros controles proporcionais para proteger a plataforma."
      ]
    },
    {
      id: "sensitive-data",
      title: "8. Dados e documentos sensíveis",
      paragraphs: [
        "Não envie passaportes, documentos de identidade, processos migratórios, dados bancários, informações médicas ou outros dados sensíveis por e-mail, formulários públicos ou canais promocionais.",
        "O envio de documentos permanece desativado. Se for ativado, apresentaremos antes a finalidade, o acesso, a retenção e o consentimento aplicável em um canal protegido."
      ]
    },
    {
      id: "availability",
      title: "9. Funcionalidades disponíveis",
      paragraphs: [
        "A disponibilidade real de cada função é indicada na interface. Na data desta versão, pagamentos, contratação de serviços pagos, envio de documentos, assistente de IA, comunidade, agendamentos e portal profissional não estão disponíveis ao público.",
        "Uma prévia, etiqueta ou descrição futura não constitui oferta, contratação ou promessa de disponibilidade."
      ]
    },
    {
      id: "third-parties",
      title: "10. Serviços e links de terceiros",
      paragraphs: [
        "Podemos indicar autoridades, fornecedores ou sites externos. Não controlamos seu conteúdo, disponibilidade, preços, decisões ou práticas de privacidade.",
        "Os termos do terceiro se aplicam quando você o utiliza. Um link não implica recomendação, sociedade ou garantia."
      ]
    },
    {
      id: "communications",
      title: "11. Comunicações",
      paragraphs: [
        "Podemos enviar mensagens operacionais necessárias à segurança, verificação de conta e execução de função solicitada. Essas mensagens não são promocionais.",
        `O marketing será opcional, separado e enviado por ou administrado através de ${LEGAL_ENTITY.email.marketing}. Você poderá retirar a autorização a qualquer momento sem perder o acesso básico.`
      ]
    },
    {
      id: "acceptable-use",
      title: "12. Uso permitido",
      paragraphs: ["Você não pode usar a Vwayaj Ayisyen para:"],
      items: [
        "violar leis, direitos de terceiros ou controles de acesso;",
        "falsificar identidade, apresentar informações fraudulentas ou explorar pessoas vulneráveis;",
        "extrair dados de forma abusiva, distribuir malware ou interferir na segurança;",
        "publicar conteúdo ilegal, discriminatório, ameaçador ou que revele dados pessoais de terceiros;",
        "apresentar informações da plataforma como orientação oficial ou garantia de resultado."
      ]
    },
    {
      id: "intellectual-property",
      title: "13. Propriedade intelectual",
      paragraphs: [
        "A marca, o design, os textos originais, o software e demais materiais próprios são protegidos pelas leis aplicáveis. Concedemos uma licença limitada, pessoal, revogável e intransferível para usar a plataforma conforme estes Termos.",
        "Fontes, marcas e conteúdos de terceiros pertencem aos respectivos titulares. Citações e links têm finalidade informativa."
      ]
    },
    {
      id: "suspension",
      title: "14. Suspensão, mudanças e continuidade",
      paragraphs: [
        "Podemos limitar ou suspender uma conta quando for razoavelmente necessário por segurança, fraude, descumprimento ou exigência legal, observadas as garantias obrigatórias aplicáveis.",
        "Podemos alterar, manter ou retirar funções. Buscaremos avisar previamente quando uma mudança material afetar direitos ou dados, salvo urgência técnica, de segurança ou legal."
      ]
    },
    {
      id: "warranties",
      title: "15. Disponibilidade e responsabilidade",
      paragraphs: [
        "A plataforma é fornecida com esforços razoáveis de disponibilidade e exatidão, mas pode apresentar interrupções, erros ou informações desatualizadas. Nada nestes Termos exclui garantias ou direitos irrenunciáveis.",
        "Não estabelecemos limite monetário fixo em USD. Eventual responsabilidade será determinada conforme a lei obrigatória aplicável, o nexo causal e as circunstâncias do caso. Não excluímos responsabilidade que legalmente não possa ser limitada, inclusive dolo, fraude e direitos inderrogáveis do consumidor e de proteção de dados."
      ]
    },
    {
      id: "law",
      title: "16. Lei aplicável e solução de conflitos",
      paragraphs: [
        "Estes Termos são regidos pelas leis do Brasil e pelas normas obrigatórias de proteção do consumidor, privacidade e demais matérias aplicáveis segundo o país e a situação do usuário.",
        "Antes de recorrer ao Judiciário, você pode escrever para legal@vwayajayisyen.com em busca de solução. Quando legalmente válido, os tribunais de São Paulo, Brasil, serão competentes, sem retirar do consumidor o foro ou outros direitos assegurados por norma obrigatória."
      ]
    },
    {
      id: "changes",
      title: "17. Alterações e contato",
      paragraphs: [
        "Publicaremos a data e a versão de cada atualização. Se uma mudança material exigir nova aceitação, ela será solicitada antes da continuidade da função afetada.",
        "Dúvidas sobre estes Termos: legal@vwayajayisyen.com. Suporte geral: support@vwayajayisyen.com."
      ]
    }
  ]
};

const spanishPrivacy: LegalDocumentContent = {
  title: "Política de Privacidad",
  kicker: "Documento legal oficial",
  summary:
    "Esta Política explica qué datos personales trata Vwayaj Ayisyen, para qué los usa, con quién los comparte y cómo puedes ejercer tus derechos.",
  version: LEGAL_VERSIONS.privacy,
  effectiveDate: "23 de julio de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versión",
  languageLabel: "Idiomas jurídicos oficiales",
  languageNotice:
    "Las versiones en español y portugués son oficiales y se consideran equivalentes. Las traducciones de interfaz a otros idiomas son únicamente de cortesía.",
  contactTitle: "Responsable y contacto de privacidad",
  sections: [
    {
      id: "controller",
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `${LEGAL_ENTITY.name}, entidad de tipo ${LEGAL_ENTITY.type} en ${LEGAL_ENTITY.country}, con domicilio público en ${LEGAL_ENTITY.publicAddress}, es responsable del tratamiento descrito en esta Política.`,
        `Para privacidad y derechos de datos: ${LEGAL_ENTITY.email.legal}. Para soporte general: ${LEGAL_ENTITY.email.support}.`
      ]
    },
    {
      id: "scope",
      title: "2. Alcance y funciones activas",
      paragraphs: [
        "Esta Política se aplica al sitio público, autenticación y área de cuenta de Vwayaj Ayisyen. En esta versión, las funciones de pagos, documentos, IA, comunidad, citas y contratación de servicios pagados permanecen deshabilitadas.",
        "Antes de activar una función que trate nuevas categorías de datos, actualizaremos la información, controles y consentimientos que correspondan."
      ]
    },
    {
      id: "data",
      title: "3. Datos que tratamos",
      paragraphs: ["Según cómo uses el sitio, podemos tratar:"],
      items: [
        "datos de cuenta: correo electrónico, identificador de usuario, idioma y estado de seguridad;",
        "datos de autenticación gestionados por Supabase, como sesiones, factores y registros técnicos; no vemos tu contraseña en texto claro;",
        "aceptaciones legales: versión, fecha, idioma, mecanismo y evidencia criptográfica proporcional;",
        "solicitudes de privacidad y soporte: tipo, descripción, estado y comunicaciones necesarias;",
        "datos técnicos de seguridad: dirección IP o señales equivalentes procesadas por proveedores, navegador, fecha, eventos y resultados de CAPTCHA;",
        "preferencias estrictamente necesarias para idioma, sesión y seguridad."
      ]
    },
    {
      id: "not-collected",
      title: "4. Datos que no debes enviar",
      paragraphs: [
        "No solicitamos mediante el sitio público pasaportes, números de identificación, expedientes migratorios, datos bancarios, información médica, biometría ni otros datos sensibles.",
        "No envíes esa información a los correos de soporte, legal o promociones. La carga protegida de documentos no está habilitada."
      ]
    },
    {
      id: "purposes",
      title: "5. Finalidades",
      paragraphs: ["Tratamos los datos únicamente cuando son necesarios para:"],
      items: [
        "crear, verificar, proteger y administrar una cuenta;",
        "mostrar el sitio en el idioma seleccionado y recordar preferencias esenciales;",
        "prevenir abuso, fraude y accesos no autorizados;",
        "registrar aceptación de documentos y demostrar cumplimiento;",
        "recibir, verificar y responder solicitudes de privacidad o soporte;",
        "cumplir obligaciones legales y ejercer o defender derechos;",
        "enviar marketing sólo cuando exista una autorización separada y revocable."
      ]
    },
    {
      id: "legal-bases",
      title: "6. Bases jurídicas",
      paragraphs: [
        "Según la finalidad y la ley aplicable, podemos tratar datos para ejecutar una solicitud o relación contigo, cumplir una obligación legal o regulatoria, proteger la seguridad y prevenir fraude, ejercer derechos, atender intereses legítimos evaluados o con tu consentimiento.",
        "Cuando dependamos de consentimiento, podrás retirarlo para el futuro. La retirada no afecta el tratamiento válido realizado anteriormente ni datos que debamos conservar por otra base legal."
      ]
    },
    {
      id: "providers",
      title: "7. Proveedores y destinatarios",
      paragraphs: [
        "Usamos Supabase para autenticación y base de datos, Vercel para alojamiento y ejecución de la aplicación, Resend para correo transaccional, Proton Mail para recibir y gestionar los buzones oficiales y Cloudflare Turnstile para protección contra abuso en formularios de autenticación.",
        "Estos proveedores reciben sólo los datos necesarios para su función y operan conforme a sus propios términos, medidas y ubicaciones. Stripe, OpenAI y Zoom no reciben datos a través de las funciones públicas actuales porque pagos, IA y citas están deshabilitados.",
        "También podremos comunicar datos cuando lo exija la ley, para proteger derechos y seguridad, o en una reorganización legítima con salvaguardas adecuadas. No vendemos datos personales."
      ]
    },
    {
      id: "transfers",
      title: "8. Transferencias internacionales",
      paragraphs: [
        "Los proveedores tecnológicos pueden procesar datos fuera de Brasil o del país donde te encuentras. Aplicamos mecanismos contractuales y salvaguardas exigidos por la normativa aplicable cuando corresponde.",
        "Puedes solicitar información general sobre proveedores y garantías escribiendo a legal@vwayajayisyen.com."
      ]
    },
    {
      id: "retention",
      title: "9. Conservación",
      paragraphs: [
        "Conservamos los datos sólo durante el tiempo necesario para la finalidad informada, la seguridad, el cumplimiento de obligaciones legales y la defensa de derechos. No inventamos un plazo único porque depende de la categoría y del contexto.",
        "Al cerrar una cuenta, eliminaremos o anonimizaremos los datos que ya no sean necesarios, salvo conservación limitada exigida o permitida por ley, por ejemplo evidencia de consentimiento, fraude, seguridad o una controversia. Los proveedores pueden mantener copias temporales de respaldo según sus ciclos técnicos."
      ]
    },
    {
      id: "security",
      title: "10. Seguridad",
      paragraphs: [
        "Aplicamos controles proporcionales como cifrado en tránsito, políticas de acceso, separación de secretos, CAPTCHA, registro de eventos, autenticación multifactor para áreas privilegiadas y minimización de datos.",
        "Ningún sistema es infalible. Si detectamos un incidente relevante, actuaremos y notificaremos a las personas o autoridades cuando la ley lo exija."
      ]
    },
    {
      id: "rights",
      title: "11. Tus derechos",
      paragraphs: [
        "Según la ley aplicable, puedes solicitar confirmación y acceso; corrección; anonimización, bloqueo o eliminación; portabilidad; información sobre uso compartido; oposición o restricción; revisión de decisiones automatizadas; retirada del consentimiento; y presentar una reclamación ante una autoridad.",
        "Puedes iniciar una solicitud desde el centro de privacidad de tu cuenta o escribir a legal@vwayajayisyen.com. Verificaremos la identidad de forma proporcional y podremos pedir información mínima adicional. Responderemos en los plazos legales; una excepción será explicada cuando corresponda."
      ]
    },
    {
      id: "automation",
      title: "12. Decisiones automatizadas",
      paragraphs: [
        "La versión actual no adopta decisiones con efectos jurídicos o similares basadas únicamente en tratamiento automatizado. Las comparaciones públicas no determinan elegibilidad, aprobación ni probabilidad de éxito.",
        "Si esto cambia, informaremos la lógica general, las consecuencias y los mecanismos de revisión humana aplicables."
      ]
    },
    {
      id: "marketing",
      title: "13. Marketing",
      paragraphs: [
        `Las comunicaciones promocionales, si se habilitan, requerirán una elección separada y se administrarán mediante ${LEGAL_ENTITY.email.marketing}. No condicionaremos una cuenta básica a aceptar marketing.`,
        "Podrás darte de baja desde el mensaje o contactarnos. Conservaremos una referencia mínima de supresión para respetar tu elección."
      ]
    },
    {
      id: "children",
      title: "14. Menores",
      paragraphs: [
        "El registro está destinado a personas de 18 años o más. No recopilamos intencionalmente datos de menores mediante cuentas públicas.",
        "Si crees que recibimos datos de un menor sin autorización válida, escribe a legal@vwayajayisyen.com para que evaluemos y actuemos."
      ]
    },
    {
      id: "changes",
      title: "15. Cambios, idioma y contacto",
      paragraphs: [
        "Publicaremos la fecha y versión de las actualizaciones. Avisaremos o pediremos nueva aceptación antes de aplicar un cambio material cuando la ley o el impacto lo requieran.",
        "Las versiones oficiales en portugués y español son equivalentes. Consultas y solicitudes: legal@vwayajayisyen.com."
      ]
    }
  ]
};

const portuguesePrivacy: LegalDocumentContent = {
  title: "Política de Privacidade",
  kicker: "Documento jurídico oficial",
  summary:
    "Esta Política explica quais dados pessoais a Vwayaj Ayisyen trata, para quais finalidades, com quem os compartilha e como você pode exercer seus direitos.",
  version: LEGAL_VERSIONS.privacy,
  effectiveDate: "23 de julho de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versão",
  languageLabel: "Idiomas jurídicos oficiais",
  languageNotice:
    "As versões em português e espanhol são oficiais e consideradas equivalentes. Traduções da interface para outros idiomas são oferecidas apenas por cortesia.",
  contactTitle: "Controlador e contato de privacidade",
  sections: [
    {
      id: "controller",
      title: "1. Controlador dos dados",
      paragraphs: [
        `${LEGAL_ENTITY.name}, entidade do tipo ${LEGAL_ENTITY.type} no ${LEGAL_ENTITY.country}, com domicílio público em ${LEGAL_ENTITY.publicAddress}, é a controladora do tratamento descrito nesta Política.`,
        `Privacidade e direitos de dados: ${LEGAL_ENTITY.email.legal}. Suporte geral: ${LEGAL_ENTITY.email.support}.`
      ]
    },
    {
      id: "scope",
      title: "2. Abrangência e funções ativas",
      paragraphs: [
        "Esta Política se aplica ao site público, autenticação e área de conta da Vwayaj Ayisyen. Nesta versão, pagamentos, documentos, IA, comunidade, agendamentos e contratação de serviços pagos permanecem desativados.",
        "Antes de ativar uma função que trate novas categorias de dados, atualizaremos as informações, os controles e os consentimentos aplicáveis."
      ]
    },
    {
      id: "data",
      title: "3. Dados que tratamos",
      paragraphs: ["Conforme o uso do site, podemos tratar:"],
      items: [
        "dados da conta: e-mail, identificador de usuário, idioma e estado de segurança;",
        "dados de autenticação gerenciados pela Supabase, como sessões, fatores e registros técnicos; não vemos sua senha em texto simples;",
        "aceites jurídicos: versão, data, idioma, mecanismo e evidência criptográfica proporcional;",
        "solicitações de privacidade e suporte: tipo, descrição, estado e comunicações necessárias;",
        "dados técnicos de segurança: endereço IP ou sinais equivalentes processados por fornecedores, navegador, data, eventos e resultados de CAPTCHA;",
        "preferências estritamente necessárias para idioma, sessão e segurança."
      ]
    },
    {
      id: "not-collected",
      title: "4. Dados que você não deve enviar",
      paragraphs: [
        "Não solicitamos pelo site público passaportes, números de identificação, processos migratórios, dados bancários, informações médicas, biometria ou outros dados sensíveis.",
        "Não envie essas informações aos e-mails de suporte, jurídico ou promoções. O envio protegido de documentos não está disponível."
      ]
    },
    {
      id: "purposes",
      title: "5. Finalidades",
      paragraphs: ["Tratamos dados somente quando necessários para:"],
      items: [
        "criar, verificar, proteger e administrar uma conta;",
        "exibir o site no idioma escolhido e lembrar preferências essenciais;",
        "prevenir abuso, fraude e acesso não autorizado;",
        "registrar a aceitação de documentos e demonstrar conformidade;",
        "receber, verificar e responder a solicitações de privacidade ou suporte;",
        "cumprir obrigações legais e exercer ou defender direitos;",
        "enviar marketing apenas com autorização separada e revogável."
      ]
    },
    {
      id: "legal-bases",
      title: "6. Bases legais",
      paragraphs: [
        "Conforme a finalidade e a lei aplicável, podemos tratar dados para executar uma solicitação ou relação com você, cumprir obrigação legal ou regulatória, proteger a segurança e prevenir fraude, exercer direitos, atender interesses legítimos avaliados ou mediante consentimento.",
        "Quando o tratamento depender de consentimento, você poderá revogá-lo para o futuro. A revogação não afeta o tratamento válido anterior nem dados que devam ser mantidos por outra base legal."
      ]
    },
    {
      id: "providers",
      title: "7. Operadores e destinatários",
      paragraphs: [
        "Usamos Supabase para autenticação e banco de dados, Vercel para hospedagem e execução da aplicação, Resend para e-mail transacional, Proton Mail para receber e gerenciar as caixas postais oficiais e Cloudflare Turnstile para proteção contra abuso nos formulários de autenticação.",
        "Esses fornecedores recebem somente os dados necessários à sua função e operam conforme seus próprios termos, medidas e locais. Stripe, OpenAI e Zoom não recebem dados pelas funções públicas atuais porque pagamentos, IA e agendamentos estão desativados.",
        "Também poderemos comunicar dados quando a lei exigir, para proteger direitos e segurança ou em reorganização legítima com salvaguardas adequadas. Não vendemos dados pessoais."
      ]
    },
    {
      id: "transfers",
      title: "8. Transferências internacionais",
      paragraphs: [
        "Fornecedores de tecnologia podem processar dados fora do Brasil ou do país onde você se encontra. Adotamos os mecanismos contratuais e as salvaguardas exigidas pela regulamentação aplicável quando necessário.",
        "Você pode solicitar informações gerais sobre fornecedores e garantias pelo e-mail legal@vwayajayisyen.com."
      ]
    },
    {
      id: "retention",
      title: "9. Retenção",
      paragraphs: [
        "Mantemos dados apenas pelo tempo necessário à finalidade informada, segurança, cumprimento de obrigações legais e defesa de direitos. Não estabelecemos um prazo único porque ele depende da categoria e do contexto.",
        "Após o encerramento da conta, eliminaremos ou anonimizaremos dados desnecessários, salvo retenção limitada exigida ou permitida por lei, como evidência de consentimento, fraude, segurança ou controvérsia. Fornecedores podem manter cópias temporárias de backup conforme seus ciclos técnicos."
      ]
    },
    {
      id: "security",
      title: "10. Segurança",
      paragraphs: [
        "Aplicamos controles proporcionais, incluindo criptografia em trânsito, políticas de acesso, separação de segredos, CAPTCHA, registro de eventos, autenticação multifator em áreas privilegiadas e minimização de dados.",
        "Nenhum sistema é infalível. Se identificarmos incidente relevante, agiremos e notificaremos pessoas ou autoridades quando a lei exigir."
      ]
    },
    {
      id: "rights",
      title: "11. Seus direitos",
      paragraphs: [
        "Conforme a lei aplicável, você pode solicitar confirmação e acesso; correção; anonimização, bloqueio ou eliminação; portabilidade; informação sobre compartilhamento; oposição ou restrição; revisão de decisões automatizadas; revogação do consentimento; e apresentar reclamação a uma autoridade.",
        "Inicie uma solicitação no centro de privacidade da sua conta ou escreva para legal@vwayajayisyen.com. Verificaremos sua identidade de forma proporcional e poderemos solicitar informações mínimas adicionais. Responderemos nos prazos legais e explicaremos eventual exceção aplicável."
      ]
    },
    {
      id: "automation",
      title: "12. Decisões automatizadas",
      paragraphs: [
        "A versão atual não toma decisões com efeitos jurídicos ou similares baseadas exclusivamente em tratamento automatizado. Comparações públicas não determinam elegibilidade, aprovação ou probabilidade de sucesso.",
        "Se isso mudar, informaremos a lógica geral, as consequências e os mecanismos aplicáveis de revisão humana."
      ]
    },
    {
      id: "marketing",
      title: "13. Marketing",
      paragraphs: [
        `Comunicações promocionais, se ativadas, exigirão uma escolha separada e serão administradas por ${LEGAL_ENTITY.email.marketing}. Não condicionaremos uma conta básica à aceitação de marketing.`,
        "Você poderá cancelar o recebimento na própria mensagem ou entrando em contato. Manteremos uma referência mínima de supressão para respeitar sua escolha."
      ]
    },
    {
      id: "children",
      title: "14. Crianças e adolescentes",
      paragraphs: [
        "O cadastro é destinado a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de menores por contas públicas.",
        "Se você acredita que recebemos dados de menor sem autorização válida, escreva para legal@vwayajayisyen.com para avaliação e providências."
      ]
    },
    {
      id: "changes",
      title: "15. Alterações, idioma e contato",
      paragraphs: [
        "Publicaremos a data e a versão das atualizações. Avisaremos ou solicitaremos novo aceite antes de aplicar mudança material quando a lei ou o impacto exigirem.",
        "As versões oficiais em português e espanhol são equivalentes. Dúvidas e solicitações: legal@vwayajayisyen.com."
      ]
    }
  ]
};

const spanishCookies: LegalDocumentContent = {
  title: "Política de Cookies",
  kicker: "Documento legal oficial",
  summary:
    "Vwayaj Ayisyen utiliza únicamente tecnologías necesarias para que el sitio, la sesión y la protección contra abuso funcionen. No usamos cookies publicitarias ni analítica conductual.",
  version: LEGAL_VERSIONS.cookies,
  effectiveDate: "23 de julio de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versión",
  languageLabel: "Idiomas jurídicos oficiales",
  languageNotice:
    "Las versiones en español y portugués son oficiales y se consideran equivalentes. Las traducciones de interfaz a otros idiomas son únicamente de cortesía.",
  contactTitle: "Preguntas sobre cookies",
  sections: [
    {
      id: "what",
      title: "1. Qué son estas tecnologías",
      paragraphs: [
        "Las cookies y tecnologías similares son pequeños datos o identificadores que un sitio o proveedor usa para mantener una sesión, recordar una preferencia o proteger un formulario.",
        "Algunas se almacenan en el navegador y otras funcionan como señales técnicas de solicitud."
      ]
    },
    {
      id: "used",
      title: "2. Qué utilizamos",
      paragraphs: ["La versión actual puede usar:"],
      items: [
        "cookies de sesión y autenticación de Supabase, necesarias para iniciar sesión y mantener la seguridad de la cuenta;",
        "almacenamiento de preferencia de idioma o estado técnico estrictamente necesario;",
        "Cloudflare Turnstile en autenticación para distinguir interacciones legítimas de abuso automatizado."
      ]
    },
    {
      id: "not-used",
      title: "3. Qué no utilizamos",
      paragraphs: [
        "No usamos cookies publicitarias, perfiles de comportamiento, seguimiento entre sitios ni analítica no esencial en la versión actual.",
        "Tampoco compartimos identificadores con redes publicitarias. Si esto cambia, actualizaremos esta Política y mostraremos los controles de consentimiento requeridos antes de activar esas tecnologías."
      ]
    },
    {
      id: "duration",
      title: "4. Duración",
      paragraphs: [
        "Las cookies de sesión pueden expirar al cerrar sesión, al vencer la sesión o conforme a los controles de seguridad del proveedor. Algunas preferencias esenciales pueden permanecer hasta que las borres o cambie su configuración.",
        "Los nombres y duraciones técnicas pueden cambiar cuando el proveedor mejora su seguridad; la finalidad indicada aquí no cambia sin una actualización de esta Política."
      ]
    },
    {
      id: "choices",
      title: "5. Tus opciones",
      paragraphs: [
        "Puedes borrar o bloquear cookies desde el navegador. Si bloqueas las estrictamente necesarias, el inicio de sesión, la recuperación de cuenta o la protección contra abuso pueden dejar de funcionar.",
        "Como no activamos tecnologías no esenciales, actualmente no se muestra un banner para aceptar publicidad o analítica."
      ]
    },
    {
      id: "contact",
      title: "6. Cambios y contacto",
      paragraphs: [
        "Publicaremos fecha y versión cuando esta Política cambie. Antes de activar cookies no esenciales, implementaremos la información y elección exigidas por la ley aplicable.",
        "Consultas: legal@vwayajayisyen.com."
      ]
    }
  ]
};

const portugueseCookies: LegalDocumentContent = {
  title: "Política de Cookies",
  kicker: "Documento jurídico oficial",
  summary:
    "A Vwayaj Ayisyen usa apenas tecnologias necessárias para o funcionamento do site, da sessão e da proteção contra abuso. Não usamos cookies publicitários nem análise comportamental.",
  version: LEGAL_VERSIONS.cookies,
  effectiveDate: "23 de julho de 2026",
  updatedLabel: "Vigente desde",
  versionLabel: "Versão",
  languageLabel: "Idiomas jurídicos oficiais",
  languageNotice:
    "As versões em português e espanhol são oficiais e consideradas equivalentes. Traduções da interface para outros idiomas são oferecidas apenas por cortesia.",
  contactTitle: "Dúvidas sobre cookies",
  sections: [
    {
      id: "what",
      title: "1. O que são essas tecnologias",
      paragraphs: [
        "Cookies e tecnologias semelhantes são pequenos dados ou identificadores usados por um site ou fornecedor para manter uma sessão, lembrar uma preferência ou proteger um formulário.",
        "Alguns ficam armazenados no navegador e outros funcionam como sinais técnicos da solicitação."
      ]
    },
    {
      id: "used",
      title: "2. O que usamos",
      paragraphs: ["A versão atual pode usar:"],
      items: [
        "cookies de sessão e autenticação da Supabase, necessários para login e segurança da conta;",
        "armazenamento de preferência de idioma ou estado técnico estritamente necessário;",
        "Cloudflare Turnstile na autenticação para distinguir interações legítimas de abuso automatizado."
      ]
    },
    {
      id: "not-used",
      title: "3. O que não usamos",
      paragraphs: [
        "Não usamos cookies publicitários, perfis comportamentais, rastreamento entre sites ou análise não essencial na versão atual.",
        "Também não compartilhamos identificadores com redes de publicidade. Se isso mudar, atualizaremos esta Política e mostraremos os controles de consentimento exigidos antes de ativar essas tecnologias."
      ]
    },
    {
      id: "duration",
      title: "4. Duração",
      paragraphs: [
        "Cookies de sessão podem expirar no logout, no vencimento da sessão ou conforme os controles de segurança do fornecedor. Algumas preferências essenciais podem permanecer até serem apagadas ou alteradas.",
        "Nomes e durações técnicas podem mudar quando o fornecedor aprimora a segurança; a finalidade indicada aqui não muda sem atualização desta Política."
      ]
    },
    {
      id: "choices",
      title: "5. Suas opções",
      paragraphs: [
        "Você pode apagar ou bloquear cookies no navegador. Se bloquear os estritamente necessários, login, recuperação de conta ou proteção contra abuso podem deixar de funcionar.",
        "Como não ativamos tecnologias não essenciais, atualmente não exibimos banner para aceitar publicidade ou análise."
      ]
    },
    {
      id: "contact",
      title: "6. Alterações e contato",
      paragraphs: [
        "Publicaremos data e versão quando esta Política mudar. Antes de ativar cookies não essenciais, implementaremos a informação e a escolha exigidas pela lei aplicável.",
        "Dúvidas: legal@vwayajayisyen.com."
      ]
    }
  ]
};

const legalContentByVersion: Record<
  OfficialLegalLocale,
  Record<PublishedLegalDocument, Readonly<Record<string, LegalDocumentContent>>>
> = {
  es: {
    terms: { [spanishTerms.version]: spanishTerms },
    privacy: { [spanishPrivacy.version]: spanishPrivacy },
    cookies: { [spanishCookies.version]: spanishCookies }
  },
  pt: {
    terms: { [portugueseTerms.version]: portugueseTerms },
    privacy: { [portuguesePrivacy.version]: portuguesePrivacy },
    cookies: { [portugueseCookies.version]: portugueseCookies }
  }
};

export function isPublishedLegalDocument(value: string): value is PublishedLegalDocument {
  return PUBLISHED_LEGAL_DOCUMENTS.some((document) => document === value);
}

export function getOfficialLegalLocale(locale: Locale): OfficialLegalLocale {
  return locale === "pt" ? "pt" : "es";
}

export function getLegalDocumentContent(
  document: PublishedLegalDocument,
  locale: Locale,
  version: string = LEGAL_VERSIONS[document]
): LegalDocumentContent | null {
  const versions = legalContentByVersion[getOfficialLegalLocale(locale)][document];
  return Object.hasOwn(versions, version) ? (versions[version] ?? null) : null;
}
