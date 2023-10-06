import { NextRequest, NextResponse } from 'next/server'

// https://api.mymemory.translated.net/get?q=injure&langpair=en|ru&mt=1
// https://api.datamuse.com/words?sp=ring??

let set: any[] = [{ id: '1', title: 'Title', list: [{ term: 'fdfdfd', definition: 'fdfdfdfd' }] }]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = `${+set[set.length - 1]?.id + 1 || '1'}`
    
    set.push({ ...body, id })

    return NextResponse.json({ ...body, id })
  } catch (error) {
    console.log(error)
    const err = error as Error

    return NextResponse.json({ error: { message: err.message, status: 400 } }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    let result = [...set]
    
    //const users = await fetch('http://localhost:8080/api/user')
    //console.log('users - ', await users.json())
    
    if (id) result = set.filter((item: any) => +item.id === +id)[0]
    
    console.log('GET - ', result)
    //return NextResponse.json({ sets: result, users: await users.json() })
    return NextResponse.json(result)
  } catch (error) {
    console.log(error)
    const err = error as Error

    return NextResponse.json({ error: { message: err.message, status: 400 } }, { status: 400 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const index = set.findIndex(item => item.id === data.id)
    
    set.splice(index, 1, data)

    return NextResponse.json(set[index])
  } catch (error) {
    console.log(error)
    const err = error as Error

    return NextResponse.json({ error: { message: err.message, status: 400 } }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  const data = await req.json()
  const { id } = data

  const res = set.filter((item: any) => item.id !== id)
  set = [...res]

  return NextResponse.json({ deleted: id })
}
