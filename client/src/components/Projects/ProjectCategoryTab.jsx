import { useState } from "react"; 
import PropTypes from "prop-types"; // If using PropTypes

const ToggleButton = ({ children, selected, setSelected, id }) => {
    return (
        <div
            className={`rounded-lg transition-colors ${
                selected === id ? "bg-sky-600" : "bg-zinc-900"
            }`}
        >
            <button
                onClick={() => setSelected(id)}
                className={`w-full origin-top-left rounded-lg border py-3 text-xs font-medium transition-all md:text-base ${
                    selected === id
                        ? "-translate-y-1 border-sky-600 bg-white text-sky-600"
                        : "border-zinc-900 bg-white text-zinc-900 hover:-rotate-2"
                }`}
            >
                {children}
            </button>
        </div>
    );
};

// Optional: Add PropTypes
ToggleButton.propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.number.isRequired,
    setSelected: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export const ProjectsCategoryTabs = () => {
    const [selected, setSelected] = useState(1);

    return (
        <div className="bg-zinc-50">
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-8 py-6 lg:grid-cols-4">
                {TAB_DATA.map((t) => (
                    <ToggleButton
                        key={t.id}
                        id={t.id}
                        selected={selected}
                        setSelected={setSelected}
                    >
                        {t.title}
                    </ToggleButton>
                ))}
            </div>
        </div>
    );
};

const TAB_DATA = [
    {
        id: 1,
        title: "ReactJS",
    },
    {
        id: 2,
        title: "NextJS",
    },
    {
        id: 3,
        title: "Angular",
    },
    {
        id: 4,
        title: "C# / .NET",
    },
];
