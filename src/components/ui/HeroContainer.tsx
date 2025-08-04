import Image from "next/image";
import ActionButton from "./ActionButton";

interface HeroContainerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  imageAlt: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const HeroContainer: React.FC<HeroContainerProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  image,
  imageAlt,
  backgroundColor = "bg-green-100",
  textColor = "text-gray-800",
  className = ""
}) => {
  return (
    <section className={`w-full ${className}`} style={{ padding: 'clamp(16px, 3vw, 32px) clamp(16px, 2vw, 16px)' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className={`
            ${backgroundColor} 
            rounded-xl overflow-hidden shadow-lg
            flex flex-row-reverse
            h-[clamp(250px,50vw,400px)]
          `}
        >
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center p-[clamp(10px,4vw,40px)] h-full">
            <div className="w-full max-w-[clamp(280px,70vw,702px)] flex flex-col gap-[clamp(5px,3vw,32px)]  mx-auto text-right">
              <h2 className={`
                font-medium
                ${textColor} 
                text-right w-full
                
              `}
              style={{ 
                fontFamily: '"Somar Sans", sans-serif',
                fontSize: 'clamp(20px, 4vw, 48px)'
              }}
              >
                {title}
              </h2>
              
              <p className={`
                ${textColor} opacity-90 
                 text-right w-full
                font-medium
              `}
              style={{ 
                fontFamily: '"Somar Sans", sans-serif',
                fontSize: 'clamp(14px, 2.5vw, 24px)'
              }}
              >
                {description}
              </p>
              
              <ActionButton
                href={buttonHref}
                icon={<span className="text-3xl">←</span>}
              >
                {buttonText}
                
              </ActionButton>
            </div>
          </div>
          {/* Image Content */}
          <div className="flex-1 relative" style={{ minHeight: 'clamp(200px, 30vw, 400px)' }}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover rounded-bl-[25%]"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer; 