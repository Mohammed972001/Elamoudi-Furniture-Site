import { ContainerSection as ContainerSectionType } from "@/types";
import Card from "./Card";

interface ContainerSectionProps {
  section: ContainerSectionType;
  className?: string;
  gridCols?: string;
  mobileCols?: string;
}

const ContainerSection: React.FC<ContainerSectionProps> = ({ 
  section, 
  className = "",
  gridCols = "md:grid-cols-3",
  mobileCols = "grid-cols-1" // Default mobile grid
}) => {
  return (
    <section className={`py-8 px-4 max-w-7xl mx-auto ${className}`}>
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {section.title}
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
      </div>

      {/* Cards Grid */}
      <div className={`grid ${mobileCols} ${gridCols} gap-6 touch-manipulation`}>
        {section.items.map((item) => (
          <Card 
            key={item.id} 
            item={item}
            className="h-full cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
};

export default ContainerSection; 