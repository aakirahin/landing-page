import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import james from "../assets/reviews/james_patel.svg"
import sarah from "../assets/reviews/sarah_chen.svg"
import emily from "../assets/reviews/emily_rod.svg"
import { cardClass, h2Class, secondaryClass } from "../utils/tailwindClasses"

const reviews = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Product Manager",
        company: "TechNova",
        avatar: sarah,
        quote: "Synchrono transformed how our team works. We save hours every week on manual tasks."
    },
    {
        id: 2,
        name: "James Patel",
        role: "Operations Lead",
        company: "ScaleWorks",
        avatar: james,
        quote: "The automation features are a game changer. Setup was quick and intuitive."
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "CEO",
        company: "BrightLabs",
        avatar: emily,
        quote: "We've increased productivity by over 40% since switching to Synchrono."
    }
]

const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
    const targetRotation = index % 2 === 0 ? 2 : -2
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"]
    })
    const rotate = useTransform(scrollYProgress, [0, 1], [0, targetRotation])

    return (
        <div ref={cardRef} className="flex flex-col items-center sticky top-80 h-[50vh]">
            <motion.div
                className={`flex flex-col gap-4 w-[400px] shadow-lg ${cardClass}`}
                style={{ rotate }}
            >
                <p className="text-[16px] font-medium">"{review.quote}"</p>
                <div className="flex gap-3 items-center">
                    <img 
                        src={review.avatar}
                        alt={review.name}
                    />
                    <div className="flex flex-col">
                        <span className="font-medium">{review.name}</span>
                        <span className={secondaryClass}>{review.role}, {review.company}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const WallOfLove = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })
    // Push the h2 upward in the last ~15% of the section's scroll,
    const h2Y = useTransform(scrollYProgress, [0.95, 1], [0, -300])

    return (
        <section ref={ref} className={`h-[200vh] flex flex-col justify-center items-center gap-[48px] w-2/3`}>
            <motion.h2 style={{ y: h2Y }} className={`sticky top-60 z-10 ${h2Class}`}>See what people are saying about us!</motion.h2>
            {
                reviews.map((review, i) => (
                    <ReviewCard 
                        review={review} 
                        index={i} 
                        key={review.id}
                    />
                ))
            }
        </section>
    )
}

export default WallOfLove