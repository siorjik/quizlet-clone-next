import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { z } from 'zod'

import { languageOptions } from '@/utils/constants'

const getUniqueString = (arr: string[]): string => {
  const resArr = arr.map(item => item.split(', ')).flat()

  return Array.from(new Set(resArr)).join(', ')
}

const getMappedTranslates = (data: string[]): string[] => {
  let res: string[] = []
  let index = 0

  while (index < data.length) {
    res = [...res, getUniqueString([...res, data[index]])]

    index += 1
  }

  return res
}

export default async (word: string, inputLanguage: string, outputLanguage: string) => {
  const system = 'You are an expert translator.'

  const input = `
    Translate '${word}' with unique variants
    from ${languageOptions.find(item => item.value === inputLanguage)?.label.toLowerCase()}
    to ${languageOptions.find(item => item.value === outputLanguage)?.label.toLowerCase()}.
    Return data in JSON format according following format: { translates: string[] }.
  `

  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      translates: z.array(z.string()).describe('The list of translated texts'),
    })
  )

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', system],
    ['user', '{input}'],
  ])

  const chain = prompt.pipe(model).pipe(parser)

  const resp = await chain.invoke({ input })

  return getMappedTranslates(resp.translates)
}
