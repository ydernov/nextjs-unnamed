import Image from "next/image";
import { FC } from "react";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getMaskPosition = (
  val1min = 30,
  val1max = 70,
  val2min = 30,
  val2max = 70
) =>
  `${randomIntFromInterval(val1min, val1max)}% ${randomIntFromInterval(
    val2min,
    val2max
  )}%`;

// after:bg-orange-500 after:inline-block after:h-6 after:w-full after:rounded-[25%_75%_100%_0%/0%_0%_100%_100%]

const RecipeCard: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <article
      className="w-[340px] h-[520px] bg-red-50 rounded-3xl shadow-lg overflow-clip"
      itemScope
      itemType="https://schema.org/Recipe"
      style={
        {
          // -webkit-mask-image: url(star.svg);
          // WebkitMaskImage: "url(/mask2.png)",
          // maskImage: "url(/mask.png)",
        }
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <clipPath id="wavy-clip-path">
            <path
              fill="#000000"
              d="
                M 0, 0
                L 0, 128
                C 62.5, 120, 123.5, 111, 167, 111
                C 210.5 111 271 129 340 128
                L 340, 0
                L 0, 0
                Z 
              "
            ></path>
          </clipPath>
        </defs>
      </svg>
      <div
        className=" [clip-path:url(#wavy-clip-path)] h-32 p-4 bg-orange-500 [mask-image:url(/mask2.png),url(/mask-min.png)] [mask-repeat:no-repeat,repeat] [mask-size:180%,160%] transition-[mask-position] duration-[20000ms] ease-in-out hover:![mask-position:right_10px_bottom_10px,left_10px_top_10px]"
        style={{
          maskPosition: `${getMaskPosition()}, ${getMaskPosition(
            20,
            80,
            94,
            206
          )}`,
          WebkitMaskPosition: `${getMaskPosition()}, ${getMaskPosition(
            20,
            80,
            94,
            206
          )}`,
        }}
      >
        <h2 className="text-xl" itemProp="name">
          The longest recipe name there is on this platform
        </h2>
      </div>
      {/* <Image src={src} alt={alt} width={300} height={200} /> */}
      <p itemProp="description">Small product description...</p>
    </article>
  );
};

export default RecipeCard;
