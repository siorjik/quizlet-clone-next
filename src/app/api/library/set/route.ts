import { NextRequest, NextResponse } from 'next/server'

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
    let result = set

    if (id) result = set.filter((item: any) => +item.id === +id)[0]

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
    
    return NextResponse.json(set.splice(index, 1, data))
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
