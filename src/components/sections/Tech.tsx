import { SectionWrapper } from '../../hoc';
import { technologies } from '../../constants';
import type { TTechnology } from '../../types';
import './tools.css';
function ToolGrid({ tools }: { tools: TTechnology[] }) {
  return <ul className="tools-grid">
    {tools.map(tool => <li className="tool-card" key={tool.name}>
      <span className={`tool-logo-frame${tool.name === 'Storlytics' ? ' tool-logo-dark' : ''}`} aria-hidden="true">
        <img src={tool.icon} width={36} height={36} loading="lazy" decoding="async" alt="" />
      </span>
      <span className="tool-name">{tool.name}</span>
    </li>)}
  </ul>;
}
const Tech = () => <>
  <h2 className="text-white text-2xl font-semibold mb-7">Tools & technologies</h2>
  <ToolGrid tools={technologies} />
</>;
export default SectionWrapper(Tech, 'tech');
