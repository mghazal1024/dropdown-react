import React, { FC, useState, useRef, useEffect} from 'react'
import './styles.scss'

interface DropdownProps {
    list: [],
    name: string,
    initialValue?: string,
    reset: boolean,
    handleSelection(data: string): any;
}

const App: FC<DropdownProps> = ({list, name, handleSelection, initialValue, reset}) => {

    // STATES
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selection, setSelection] = useState<string>();

    // REFS
    const ref = useRef<HTMLUListElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLDivElement>(null);

    // Handles dropdown
    const handleDropdownActive = (e: PointerEvent) => {
        if(ref.current && !ref.current.contains(e.target as HTMLElement)) {
            setDropdownActive(false);
        }
        if (!dropdownActive && title.current && title.current.contains(e.target as HTMLElement)) {
            setDropdownActive(true);
        }
    };

    // Handles data change
    const handleChange = (data: string) => {
        handleSelection(data)
    }

    // LIFECYCLE of the Component
    useEffect(() => {
        document.addEventListener('click', handleDropdownActive, true);
        dropdownRef.current?.addEventListener('focusin', () => {
            setDropdownActive(true);
        })
        dropdownRef.current?.addEventListener('focusout', () => {
            setDropdownActive(false);
        })
    },[]);

    useEffect(() => {
        setSelection(initialValue ? initialValue : '')
    }, [reset])

    return (
        <div className='dropdown' tabIndex={0} ref={dropdownRef}>
            <div ref={title} className='dropdown__block dropdown__block--title' onClick={() => handleDropdownActive}>
                <p className='dropdown__title'>{!selection ? `Select a ${name}` : selection}</p>
            </div>
            <div className='dropdown__block'>
                <ul ref={ref} className={`dropdown__list ${ dropdownActive ? 'dropdown__list--active' : '' }`}>
                    {list.map((li, i) => {
                        return (
                            <li key={i} className='dropdown__list-item' onClick={() => { setSelection(li); setDropdownActive(false); handleChange(li)} }>{li}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default App


// import React, { ReactNode } from "react"
// import "./styles.scss"

// export type ButtonProps = {
//   variant: "primary" | "success" | "warning" | "danger"
//   size: "small" | "medium" | "large"
//   label: ReactNode
//   onClick: React.MouseEventHandler<HTMLButtonElement>
// }

// const App = ({
//   variant = "primary",
//   size = "medium",
//   label,
//   onClick,
// }: ButtonProps) => {
//   let className = ""
//   className = "spunky_button " + variant + " " + size

//   return (
//     <button className={className} onClick={onClick}>
//       {label}
//     </button>
//   )
// }

// export default App
