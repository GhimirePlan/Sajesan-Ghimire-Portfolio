import { testimonials } from '../../constants';
import { FiChevronDown } from 'react-icons/fi';
function Feedbacks() {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 sm:px-16 py-6 sm:py-8">
      <details className="testimonials-disclosure">
        <summary role="button" className="testimonials-toggle" aria-label="Toggle testimonials">
          <div>
            <h2 className="text-white text-base sm:text-lg font-medium">Testimonials</h2>
            <p className="text-secondary text-xs mt-1">Professional feedback</p>
          </div>
          <span className="testimonials-toggle-action">
            <span className="testimonials-show">View feedback</span>
            <span className="testimonials-hide">Hide feedback</span>
            <FiChevronDown size={18} aria-hidden="true" />
          </span>
        </summary>
        <div className="testimonials-content grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </details>
    </section>
  );
}
export default Feedbacks;
