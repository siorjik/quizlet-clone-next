import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'

import { FormInputPropTypes } from '@/types/FormTypes'
import useKeyPress from '@/hooks/useKeyPress'

export default function Autocomplete(
  { inputProps, data = [], q, setValue }:
    { inputProps: FormInputPropTypes, data: string[], q: string, setValue: (value: string) => void }
) {
  const [list, setList] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [hovered, setHovered] = useState<string | undefined>(undefined)
  const [isShow, setShow] = useState(false)
  const [inputName, setInputName] = useState<undefined | string>(undefined)

  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')
  const escapePress = useKeyPress('Escape')
  const tabPress = useKeyPress('Tab')

  const { type = 'text', blockStyle = '', inputStyle, errors, placeholder, name = 'name', register } = inputProps

  const inputRef = useRef<HTMLInputElement | null>(null)

  const isTargetInput = inputName === inputRef.current?.name

  useEffect(() => {
    if (!q) {
      setList(data)
      setShow(false)
      setInputName(undefined)
    } else if (!list.includes(q)) setList(data.filter(item => item.includes(q)))
  }, [q])

  useEffect(() => {
    if (!!list.length && q) {
      setShow(true)
      setInputName(inputRef.current?.name)
      setCursor(0)
    }
  }, [list])

  useEffect(() => {
    if (isTargetInput && isShow) {
      setShow(false)
      setInputName(undefined)
    }
  }, [escapePress, tabPress])

  useEffect(() => {
    if (list.length && downPress) {
      setCursor(prevState => prevState < list.length - 1 ? prevState + 1 : prevState)
      inputRef.current?.blur()
    }
  }, [downPress])
  
  useEffect(() => {
    if (list.length && upPress && isTargetInput) {
      if (cursor === 0) inputRef.current?.focus()
      setCursor(prevState => prevState > 0 ? prevState - 1 : prevState)
    }
  }, [upPress])

  useEffect(() => {
    if (list.length && enterPress && isTargetInput) {
      setShow(false)
      setInputName(undefined)

      inputRef.current?.focus()

      setValue(list[cursor])
    }
  }, [cursor, enterPress])

  useEffect(() => {
    if (list.length && hovered) {
      setCursor(list.indexOf(hovered))
    }
  }, [hovered])

  const onClick = (item: string) => {
    setShow(false)

    setValue(item)
  }

  const ListItem = (
    { item, active, setSelected, setHovered }:
      {
        item: string,
        active: boolean,
        setSelected: (item: string) => void,
        setHovered: Dispatch<SetStateAction<string | undefined>>
      }
  ) => (
    <li
      className={`py-3 px-3 ${active ? 'bg-red-50' : ''}`}
      onClick={() => setSelected(item)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item}
    </li>
  )

  return (
    <>
      <div className={`${blockStyle}`}>
        <input
          className={inputStyle}
          placeholder={placeholder}
          {...register}
          type={type}
          autoComplete='off'
          ref={(el) => {
            register.ref(el)

            inputRef.current = el
          }}
        />
        {
          errors?.[name] && <div className='px-3 text-red-600 text-sm absolute'>{errors[name]?.message as ReactNode}</div>
        }
      </div>
      {isShow && !!list.length && <ul className='absolute p-1 top-12 z-10 bg-red-100 rounded-lg'>
        {
          list.map((item, index) => (
            <ListItem
              key={index}
              active={index === cursor}
              item={item}
              setSelected={onClick}
              setHovered={setHovered}
            />
          ))
        }
      </ul>}
    </>
  )
}
