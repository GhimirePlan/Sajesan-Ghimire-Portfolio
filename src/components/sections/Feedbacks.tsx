import { testimonials } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import { config } from '../../constants/config';
function Feedbacks() {
  return (
    <>
      <Header useMotion={false} {...config.sections.feedbacks} />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map(item => (
          <figure
            key={item.name}
            className="border border-white/10 rounded-2xl bg-tertiary/50 p-6 flex flex-col"
          >
            <blockquote className="text-secondary text-sm leading-7 flex-1">
              “{item.testimonial}”
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10 flex gap-3 items-center">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#915EFF]/15 text-[#c9b5ff] text-xs font-medium"
              >
                {item.name
                  .split(' ')
                  .map(part => part[0])
                  .join('')}
              </span>
              <div>
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-secondary text-xs mt-1">
                  {item.designation} · {item.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
export default SectionWrapper(Feedbacks, 'testimonials');
