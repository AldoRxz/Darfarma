export interface BlogArticle {
    slug: string
    title: string
    date: string
    excerpt: string
    category: string
    readTime: string
    content: {
        type: "paragraph" | "heading" | "subheading" | "list"
        text?: string
        items?: string[]
    }[]
}

export const blogArticles: BlogArticle[] = [
    {
        slug: "nutraceuticos",
        title: "¿Has escuchado hablar de los nutracéuticos?",
        date: "8 de febrero de 2024",
        excerpt:
            "Se define como nutracéutico a cualquier alimento o ingrediente de los alimentos que ejerce acción benéfica en la salud del hombre.",
        category: "Nutracéuticos",
        readTime: "6 min",
        content: [
            {
                type: "heading",
                text: "Lo que es conveniente saber",
            },
            {
                type: "paragraph",
                text: 'Se define como nutracéutico a "cualquier alimento o ingrediente de los alimentos que ejerce acción benéfica en la salud del hombre". El término es adoptado a partir de que la industria de alimentos los califica como alimentos funcionales, por tener algún efecto fisiológico que puede beneficiar la salud de quienes los ingieren.',
            },
            {
                type: "heading",
                text: "Clasificación",
            },
            {
                type: "paragraph",
                text: "Como se mencionó, se conoce con el término de nutracéutico a alimentos y componentes nutricionales de estos, que proveen beneficios para la salud de los seres humanos o para la prevención o para coadyuvar los tratamientos de casi todas las patologías conocidas por el hombre. Generalmente son comercializados en formas farmacéuticas como cápsulas, polvos, suspensiones, soluciones, etc.",
            },
            {
                type: "paragraph",
                text: "Se pueden clasificar según los nutrientes que contengan como: lípidos, carbohidratos, proteínas, azúcares, vitaminas, etc. O por las moléculas aisladas de alimentos como: minerales, antioxidantes, carotenos, licopenos, ácidos grasos, Omega 3, Omega 6, fitoesteroles, prebióticos y probióticos por citar algunos ejemplos.",
            },
            {
                type: "heading",
                text: "¿Por qué es importante tomar Nutracéuticos?",
            },
            {
                type: "paragraph",
                text: "La nutrición es una parte imprescindible para tener buena salud física y mental, e indispensable para la actividad diaria y productividad; y no solo eso, también para prevenir enfermedades y coadyuvar en el tratamiento de las mismas.",
            },
            {
                type: "paragraph",
                text: 'Entonces, ¿por qué no invertir en nuestra salud, así como invertimos en nuestro retiro después de una vida de trabajo? Linus Pauling menciona lo siguiente: "No hay enfermedades si no deficiencias nutrimentales".',
            },
            {
                type: "paragraph",
                text: "Aunado a esto con el paso del tiempo los suelos donde se cultivan las hortalizas, frutas, verduras se van contaminando y perdiendo su microbiota y con ello sus cualidades benéficas para los cultivos con lo que los frutos y vegetales que consumimos carecen de los nutrientes que nuestro cuerpo necesita por lo que el consumo de nutracéuticos ya no es una opción sino una necesidad en la actualidad.",
            },
            {
                type: "heading",
                text: "Utilidad de los Nutracéuticos",
            },
            {
                type: "paragraph",
                text: "Estamos expuestos a gran número de compuestos químicos, contaminación, conservadores, además de las reacciones de oxidación del cuerpo lo que genera radicales libres los cuales al oxidar las membranas celulares pueden generar daño al ADN celular y generar así enfermedades como: cáncer, problemas cardiovasculares y envejecimiento.",
            },
            {
                type: "paragraph",
                text: "Los antioxidantes son compuestos que por su estructura química frenan la formación de radicales libres, previenen o permiten tratar enfermedades causadas por el estrés oxidativo. Es por eso que hace más de 15 años se desarrolló una prueba llamada ORAC (Oxygen Radical Absorbing Capacity) y en base a esta determinación entre los antioxidantes más importantes podemos nombrar: la vitamina C, la vitamina E, el resveratrol, por citar algunos ejemplos. DARFARMA es consciente de esto y por eso incluye estos como parte de sus desarrollos nutracéuticos.",
            },
        ],
    },
    {
        slug: "creatina-mayores-45",
        title: "La Creatina: Un Aliado Sorprendente para la Salud de Mayores de 45 Años",
        date: "14 de noviembre de 2023",
        excerpt:
            "La creatina ofrece una serie de beneficios significativos para las personas mayores de 45 años, contribuyendo a la mejora de la salud general y la calidad de vida.",
        category: "Suplementos",
        readTime: "7 min",
        content: [
            {
                type: "paragraph",
                text: "La creatina es un suplemento que ha sido durante mucho tiempo un elemento básico en el mundo del fitness y el rendimiento deportivo. Sin embargo, su utilidad va mucho más allá de los gimnasios y las canchas. Sorprendentemente, la creatina ofrece una serie de beneficios significativos para las personas mayores de 45 años, contribuyendo a la mejora de la salud general y la calidad de vida en esta etapa crucial.",
            },
            {
                type: "heading",
                text: "1. Potenciador de Energía y Función Cognitiva",
            },
            {
                type: "paragraph",
                text: "A medida que envejecemos, la capacidad de nuestro cuerpo para producir energía disminuye. La creatina, conocida por su papel en la producción de ATP, la fuente de energía celular, puede ser una herramienta valiosa para combatir la fatiga y mejorar la resistencia en adultos mayores. Además, varios estudios sugieren que la creatina también puede tener efectos positivos en la función cognitiva, mejorando la memoria y la capacidad de concentración.",
            },
            {
                type: "heading",
                text: "2. Preservación de la Masa Muscular",
            },
            {
                type: "paragraph",
                text: "La pérdida de masa muscular es una preocupación común a medida que envejecemos, y se asocia con una disminución de la fuerza y la funcionalidad. La creatina ha demostrado ser eficaz en la preservación de la masa muscular, ayudando a contrarrestar el proceso natural de pérdida muscular relacionado con la edad. Esto no solo mejora la fuerza, sino que también contribuye a una mayor independencia y calidad de vida.",
            },
            {
                type: "heading",
                text: "3. Beneficios para la Salud Ósea",
            },
            {
                type: "paragraph",
                text: "La salud ósea es otra área en la que la creatina puede marcar la diferencia. Algunas investigaciones sugieren que este suplemento podría desempeñar un papel en la mejora de la densidad mineral ósea, reduciendo el riesgo de fracturas y mejorando la salud general del sistema esquelético en personas mayores.",
            },
            {
                type: "heading",
                text: "4. Reducción del Riesgo de Enfermedades Neurodegenerativas",
            },
            {
                type: "paragraph",
                text: "Existen evidencias que respaldan la idea de que la creatina puede tener un impacto positivo en la salud cerebral, lo que podría ser especialmente relevante en la prevención de enfermedades neurodegenerativas asociadas con el envejecimiento. Algunos estudios sugieren que la creatina tiene propiedades neuroprotectoras, lo que la convierte en una herramienta potencial en la lucha contra condiciones como el Alzheimer y el Parkinson.",
            },
            {
                type: "heading",
                text: "5. Apoyo en Condiciones Crónicas",
            },
            {
                type: "paragraph",
                text: "La creatina también ha mostrado beneficios en la gestión de condiciones crónicas comunes en la población de mayores de 45 años, como la diabetes tipo 2 y la hipertensión. Su capacidad para mejorar la sensibilidad a la insulina y promover una mejor salud cardiovascular la posiciona como un aliado valioso en la gestión de estas enfermedades.",
            },
            {
                type: "heading",
                text: "Conclusiones",
            },
            {
                type: "paragraph",
                text: "Aunque la creatina ha sido durante mucho tiempo un suplemento popular en el mundo del deporte, su aplicación va más allá de los atletas jóvenes. Para aquellos mayores de 45 años, la creatina emerge como un aliado sorprendente en la búsqueda de una vida más saludable y activa. Sin embargo, es crucial destacar la importancia de consultar a un profesional de la salud antes de incorporar cualquier suplemento a la rutina diaria, para asegurar que sea adecuado para las necesidades individuales y no presente riesgos potenciales.",
            },
        ],
    },
    {
        slug: "habitos-sanos-salud-calidad",
        title: "Hábitos Sanos para una Salud de Calidad: Tu Guía para una Vida Plena",
        date: "1 de septiembre de 2023",
        excerpt:
            "La clave para una vida larga y saludable está en nuestros hábitos diarios. Exploramos los hábitos saludables fundamentales para alcanzar una vida plena.",
        category: "Bienestar",
        readTime: "8 min",
        content: [
            {
                type: "paragraph",
                text: "La búsqueda de una vida larga y saludable es un objetivo universal que todos compartimos. Sin embargo, a menudo nos enfrentamos a la confusión sobre qué hacer para mantener una salud de calidad. La buena noticia es que la clave para lograrlo está en nuestros hábitos diarios. En este artículo, exploraremos los hábitos saludables fundamentales que pueden ayudarte a alcanzar una vida plena y saludable.",
            },
            {
                type: "heading",
                text: "1. Alimentación Balanceada",
            },
            {
                type: "paragraph",
                text: "La nutrición es esencial para una salud óptima. Opta por una dieta rica en frutas, verduras, proteínas magras, granos enteros y grasas saludables. Evita los alimentos ultraprocesados, ricos en azúcares y grasas trans. La moderación es clave, así que disfruta de tus indulgencias ocasionalmente. Además, asegúrate de mantener una hidratación adecuada bebiendo suficiente agua durante el día.",
            },
            {
                type: "heading",
                text: "2. Ejercicio Regular",
            },
            {
                type: "paragraph",
                text: "El ejercicio no solo ayuda a mantener un peso saludable, sino que también mejora la función cardiovascular, la fuerza muscular y la salud mental. Establece una rutina de ejercicio que te guste y puedas mantener a largo plazo. Caminar, nadar, correr, yoga o levantamiento de pesas son excelentes opciones. Recuerda que incluso pequeñas cantidades de actividad física pueden marcar la diferencia.",
            },
            {
                type: "heading",
                text: "3. Sueño de Calidad",
            },
            {
                type: "paragraph",
                text: "El sueño es crucial para la recuperación y el funcionamiento óptimo del cuerpo. Establece un horario de sueño regular y busca dormir de 7 a 9 horas por noche. Crea un ambiente propicio para el descanso en tu dormitorio, evitando dispositivos electrónicos antes de acostarte y manteniendo la habitación oscura y fresca.",
            },
            {
                type: "heading",
                text: "4. Gestión del Estrés",
            },
            {
                type: "paragraph",
                text: "El estrés crónico puede tener efectos negativos en la salud. Practica técnicas de relajación como la meditación, el yoga o la respiración profunda para reducir el estrés. Además, establece límites claros en tu vida y busca apoyo si sientes que la presión se vuelve abrumadora.",
            },
            {
                type: "heading",
                text: "5. Relaciones Sociales Saludables",
            },
            {
                type: "paragraph",
                text: "Las relaciones sólidas y positivas con amigos y familiares son esenciales para una salud emocional. Cultiva conexiones significativas, mantén una comunicación abierta y busca apoyo cuando lo necesites. El apoyo social puede ser un factor clave en la recuperación de problemas de salud y el bienestar general.",
            },
            {
                type: "heading",
                text: "6. Exámenes Médicos Regulares",
            },
            {
                type: "paragraph",
                text: "No subestimes el poder de la prevención. Programa chequeos médicos regulares y exámenes de detección temprana. Esto puede ayudar a identificar problemas de salud antes de que se conviertan en mayores preocupaciones.",
            },
            {
                type: "heading",
                text: "7. Evitar el Consumo de Tabaco y Alcohol en Exceso",
            },
            {
                type: "paragraph",
                text: "El tabaco y el consumo excesivo de alcohol están relacionados con numerosas enfermedades graves. Si eres fumador, busca ayuda para dejarlo, y si bebes alcohol, hazlo con moderación.",
            },
            {
                type: "heading",
                text: "Conclusión",
            },
            {
                type: "paragraph",
                text: "Una vida de calidad está al alcance de todos si estamos dispuestos a adoptar hábitos saludables. Recuerda que los cambios a largo plazo requieren paciencia y constancia. Comienza con pequeños pasos y busca el apoyo de amigos, familiares o profesionales de la salud si es necesario. Con una alimentación equilibrada, ejercicio regular, sueño de calidad y un enfoque en la gestión del estrés, puedes disfrutar de una vida plena y saludable. ¡Tu salud está en tus manos, así que comienza hoy mismo a construir hábitos que te llevarán hacia un futuro más saludable y feliz!",
            },
        ],
    },
    {
        slug: "poder-potencia-levantamiento-pesas",
        title: "El Poder y la Potencia en el Levantamiento de Pesas y el Deporte",
        date: "1 de septiembre de 2023",
        excerpt:
            "El poder y la potencia son dos cualidades esenciales que desempeñan un papel fundamental en el rendimiento de los atletas en una variedad de disciplinas deportivas.",
        category: "Deporte",
        readTime: "7 min",
        content: [
            {
                type: "paragraph",
                text: "El levantamiento de pesas y el deporte en general están repletos de términos y conceptos complejos que a menudo pueden parecer confusos para el espectador casual. Uno de esos conceptos es la diferencia entre el poder y la potencia, dos cualidades esenciales que desempeñan un papel fundamental en el rendimiento de los atletas en una variedad de disciplinas deportivas, pero que son especialmente cruciales en el mundo del levantamiento de pesas.",
            },
            {
                type: "heading",
                text: "El Poder: La Fuerza Explosiva",
            },
            {
                type: "paragraph",
                text: "El poder se refiere a la capacidad de un atleta para generar una gran cantidad de fuerza en un período de tiempo muy corto. Es la manifestación de la fuerza explosiva y se mide en términos de la velocidad con la que se puede aplicar la fuerza. En el levantamiento de pesas, el poder se manifiesta cuando un atleta es capaz de levantar una carga pesada de manera rápida y explosiva.",
            },
            {
                type: "paragraph",
                text: "Un ejemplo clásico de poder en el levantamiento de pesas es el levantamiento de envión en halterofilia. En esta disciplina, los atletas deben levantar una barra cargada desde el suelo hasta arriba de la cabeza en un solo movimiento. El poder es esencial en este movimiento porque requiere una explosión rápida de fuerza para elevar la barra por encima de la cabeza.",
            },
            {
                type: "heading",
                text: "La Potencia: Fuerza y Velocidad Combinadas",
            },
            {
                type: "paragraph",
                text: "La potencia, por otro lado, es la combinación de fuerza y velocidad. Es la capacidad de un atleta para producir una cantidad significativa de fuerza mientras mantiene una velocidad constante. La potencia es esencial en una amplia variedad de deportes, incluyendo el levantamiento de pesas, el salto de longitud, el lanzamiento de disco y muchos otros.",
            },
            {
                type: "paragraph",
                text: "En el levantamiento de pesas, la potencia se manifiesta cuando un atleta puede levantar una carga pesada de manera controlada y constante. Un ejemplo sería el levantamiento de sentadilla, donde el atleta debe bajar y levantar una carga pesada de manera controlada y precisa. La potencia juega un papel importante en este movimiento, ya que el atleta debe aplicar suficiente fuerza para levantar la carga mientras mantiene la técnica adecuada y evita lesiones.",
            },
            {
                type: "heading",
                text: "Entrenamiento para Desarrollar Poder y Potencia",
            },
            {
                type: "paragraph",
                text: "Tanto el poder como la potencia son cualidades que pueden ser entrenadas y mejoradas a lo largo del tiempo. Los levantadores de pesas y los atletas en general pueden seguir programas de entrenamiento específicos para desarrollar estas habilidades.",
            },
            {
                type: "list",
                items: [
                    "Levantamiento rápido y explosivo: Realizar ejercicios como el levantamiento olímpico, donde se levantan pesas de manera rápida y explosiva, ayuda a desarrollar el poder.",
                    "Levantamiento controlado y preciso: Los ejercicios de levantamiento de pesas que requieren control y precisión, como la sentadilla, pueden ayudar a mejorar la potencia.",
                    "Entrenamiento de fuerza: El desarrollo de la fuerza es fundamental para mejorar tanto el poder como la potencia, ya que ambas cualidades se basan en una base sólida de fuerza muscular.",
                    "Entrenamiento de velocidad: Incorporar ejercicios de velocidad y agilidad en la rutina de entrenamiento puede ayudar a mejorar la capacidad de generar fuerza rápidamente.",
                    "Técnica adecuada: Mantener una técnica adecuada en todos los movimientos es esencial para maximizar el poder y la potencia y prevenir lesiones.",
                ],
            },
            {
                type: "paragraph",
                text: "En resumen, el poder y la potencia son dos cualidades fundamentales en el levantamiento de pesas y en muchos otros deportes. Si bien son conceptos distintos, ambos desempeñan un papel crucial en el rendimiento de los atletas y pueden ser mejorados a través de un entrenamiento adecuado. El entendimiento y la aplicación de estos conceptos son esenciales para aquellos que buscan destacar en el mundo del deporte y el levantamiento de pesas.",
            },
        ],
    },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
    return blogArticles.find((article) => article.slug === slug)
}

export function getAllSlugs(): string[] {
    return blogArticles.map((article) => article.slug)
}
