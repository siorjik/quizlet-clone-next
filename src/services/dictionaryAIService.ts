import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { z } from 'zod'

import { languageOptions } from '@/utils/constants'

export default async (word: string, language: string) => {
  const system = `
    You are an expert in ${languageOptions.find(item => item.value === language)?.label.toLocaleLowerCase()} dictionary.
  `

  const input = `
    Suggest 5 unique words in lower case which started from '${word}' or return '${word}' if it is not in the dictionary.
    Return data in JSON format according following format: { words: string[] }.
  `

  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      words: z.array(z.string()).describe('The list of words'),
    })
  )

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', system],
    ['user', '{input}'],
  ])

  const chain = prompt.pipe(model).pipe(parser)

  const resp = await chain.invoke({ input })

  return resp
}
