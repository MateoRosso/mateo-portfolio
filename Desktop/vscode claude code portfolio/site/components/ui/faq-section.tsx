"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Placeholder answers — swap for the real copy.
const FAQS = [
  {
    question: "¿Qué es el CTR?",
    answer:
      "Es el porcentaje de personas que hacen click en tu video después de verlo en pantalla (Click-Through Rate). La miniatura es lo primero que se ve, así que es una de las formas más directas de subirlo. Tu video puede aparecer en el feed de mucha gente, pero si la miniatura no llama la atencion, nadie va a entrar",
  },
  {
    question: "¿Qué pasa si no me gusta la miniatura?",
    answer:
      "Revisamos hasta que quede como la imaginaste las revisiones están incluidas, no se cobran aparte.",
  },
  {
    question: "¿Podés hacer miniaturas de cualquier estilo?",
    answer:
      "Sí. Gaming, finanzas, vlogs, tutoriales, reacciones... Antes de diseñar te muestro referencias para asegurarnos que el estilo encaje con tu canal.",
  },
  {
    question: "¿Qué es lo que te diferencia del resto?",
    answer:
      "Mantengo al cliente al tanto de cada paso del proceso, y me aseguro de que la miniatura sea exactamente lo que el cliente quiere. Sin limite de revisiones.",
  },
  {
    question: "¿Usás inteligencia artificial?",
    answer:
      "Depende, si el cliente pide generar una pose en base a una imagen de su stream, o de algun video, sí. Sino el cliente manda una foto con la pose y expresion que la miniatura necesita y ahi no se usa IA. Igualmente todo esto se habla en la etapa de la idea. ",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="material overflow-hidden rounded-2xl">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="btn flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-heading text-base md:text-lg">{question}</span>
        <Plus
          className="size-5 shrink-0 text-[var(--accent)] transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="text-body px-6 pb-6 text-sm md:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
       
        <h2 className="text-heading mt-4 text-3xl md:text-5xl">
          <span className="text-[var(--accent)] [font-family:var(--font-garamond)]">Preguntas</span>{" "}
          <span className="text-[var(--accent)] [font-family:var(--font-garamond)]">frecuentes</span>
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3">
        {FAQS.map((faq, i) => (
          <Reveal key={faq.question} delay={i * 0.06}>
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
