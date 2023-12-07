import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'

import { FormInputPropTypes } from '@/types/FormTypes'
import useKeyPress from '@/hooks/useKeyPress'

export default function Autocomplete(
  { inputProps, data = [], q, setValue, clearData }:
    { inputProps: FormInputPropTypes, data: string[], q: string, setValue: (value: string) => void, clearData: () => void }
) {
  const [list, setList] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [hovered, setHovered] = useState<string | undefined>(undefined)
  const [focused, setFocused] = useState<string>('')

  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')
  const tabPress = useKeyPress('Tab')

  const { type = 'text', blockStyle = '', inputStyle, errors, placeholder, name = 'name', register, label } = inputProps

  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (focused) inputRef.current?.focus()
    else {
      if (hovered) { // this is case when we choose item from the list with mouse instead of onClick on <ListItem />
        setValue(hovered)

        setHovered(undefined)
      }

      clearData()

      return
    }
  }, [focused])

  useEffect(() => {
    if (!!data.length) {
      setList(data)
      setCursor(0)
      setFocused(inputRef.current?.name as string)
    } else setList([])
  }, [data])

  useEffect(() => {
    if (q && focused === inputRef.current?.name && data.length) setValue(q)
  }, [tabPress])

  useEffect(() => {
    if (downPress) {
      setCursor(cursor < list.length - 1 ? cursor + 1 : cursor)

      if (cursor > 1) listRef.current?.scrollBy(0, getListItemHeight(listRef.current?.children[cursor + 1] as HTMLLIElement))
    }
  }, [downPress])

  useEffect(() => {
    if (upPress) {
      setCursor(cursor > 0 ? cursor - 1 : cursor)

      listRef.current?.scrollBy(0, -(getListItemHeight(listRef.current?.children[cursor - 1] as HTMLLIElement)))
    }
  }, [upPress])

  useEffect(() => {
    if (list.length && enterPress) {
      clearData()
      setValue(list[cursor])
    }
  }, [enterPress])

  useEffect(() => {
    if (hovered) {
      setCursor(list.indexOf(hovered))
    }
  }, [hovered])

  const ListItem = (
    { item, active, setHovered }:
      {
        item: string,
        active: boolean,
        setHovered: Dispatch<SetStateAction<string | undefined>>
      }
  ) => (
    <li
      className={`py-3 px-3 ${active ? 'bg-red-50' : ''}`}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item}
    </li>
  )

  const getListItemHeight = (listItem: HTMLLIElement) => (listItem && listItem.clientHeight) || 0

  return (
    <>
      <div className={`${blockStyle}`}>
        {label && <label className='absolute left-5 top-[-8px] text-xs'>{label}</label>}
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
          onBlur={() => setFocused('')}
          onFocus={e => setFocused(e.target.name)}
        />
        {
          errors?.[name] && <div className='px-3 text-red-600 text-sm absolute'>{errors[name]?.message as ReactNode}</div>
        }

        {!!list.length && <ul className='absolute max-h-40 overflow-auto p-1 top-12 z-10 bg-red-100 rounded-lg' ref={listRef}>
          {
            list.map((item, index) => (
              <ListItem
                key={index}
                active={index === cursor}
                item={item}
                setHovered={setHovered}
              />
            ))
          }
        </ul>}
      </div>
    </>
  )
}
