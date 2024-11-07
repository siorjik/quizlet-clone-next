import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { z } from 'zod'

import { languageOptions } from '@/utils/constants'

export default async (word: string, language: string) => {
  const system = `You are an expert in ${languageOptions.find(item => item.value === language)?.label.toLocaleLowerCase()} dictionary.`

  const input = `
    Suggest 3 unique words in lower case which started from '${word}' or return '${word}' if it is not in the dictionary.
    Return data in JSON format according following format: { words: string[] }.
  `
  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-1106', maxTokens: 100 })

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      words: z.array(z.string()).describe('The list of words'),
    })
  )

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', system],
    ['user', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ])

  const fixParser = OutputFixingParser.fromLLM(model, parser)

  const tools = [new TavilySearchResults()]

  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    prompt,
    tools,
  })

  const agentExecutor = new AgentExecutor({ agent, tools })

  const response = await agentExecutor.invoke({ input })

  return fixParser.parse(response.output)
}
