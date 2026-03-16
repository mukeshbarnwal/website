---
title: RAG components and  its improvement
slug: rag-components-and-its-improvement
description: ''
author: Mukesh Barnwal
date: '2026-03-16'
tags:
  - '#RAG #LLM #Agents'
published: true
---
Retrieval Augmented Generation (RAG) is a framework to fine-tune LLM for your custom dataset. 
It comprises two components: 
1. Retriever: It fetches most similar content based on your query. 
2. Generator: It is a language unit which takes the response of the retriever and arranges the text semantically, syntactically making it understandable to the user. 

Based on the above discussion if we have to improve 1 component for getting a meaningful response, it would be the retriever. This is because 
the retriever fetches the contextual data from your domain-specific dataset. If this data is not relevant, a generator won't be helpful as it only gives the structure to your response. 

Think of it like you are making a chapati. 
> A retriever is like a dough to your chapati. 
> A generator is like a rolling pin with which you make the chapati. 

If you don't have dough and you have the best rolling pin, you won't be able to make chapati. 
Likewise, if you don't have good responses from a retriever, a generator even powerful will only provide structure and not provide any meaning to the data retrieved. 

Then the question arises how do we improve the retriever component of RAG? 
1. Try different chunking strategies: Chunking is a process to break the text into small portions. The chunks can be sentence level, paragraph level or page level. Sentence level implies breaking the text corpus into individual sentences and computing the embeddings for the same. Likewise, for paragraph level. 

2. Try different embedding models: as more advanced models can create contextually more meaningful and relevant embeddings that will be used to compute the similarity between the chunks and query. 

3. Vary the number of top retrieved passages: by retrieving more number of top similar passages with your query, you can create a refined and encompassing response that can be fed to the generator later. 

4. Utilising the concept of Retrieval Augmented Thinking(RAT): This is an iterative version of RAG. 
Think of it as refinement to the response you receive from the retriever. 
> For the first time, you passed a query to a retriever, you get the most similar passage. 
> Next time, you pass this passage(which is a query now) to the retriever and you get the top most similar passage. 
>Taking the number of iterations as 2 in this case, now you pass these 2 responses to the generator and you get a more relevant and meaningful response. 

By improving the retriever, you ensure that the generator gets the right context and your response becomes more refined and relevant.
