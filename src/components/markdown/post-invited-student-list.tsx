'use client'

import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import React, { useMemo, useState } from 'react'

interface Props {
  children: [string];
}

const FIELD_DELIMITER = '|'

export function PostInvitedStudentsList({ children }: Props) {
  const data = useMemo(() => {
    return children[0].split(/\r?\n/).filter((x) => x.length > 0).map((x) => {
      const [nr, idPrefix, id, status, score, result] = x.split(FIELD_DELIMITER)
      return { nr, idPrefix, id, status, score, result }
    })
  }, [children])
  const [searchInput, setSearchInput] = useState('')
  const filteredData = data.filter((x) => x.id.startsWith(searchInput))

  return (
    <>
      <Field orientation="horizontal" className="my-4">
        <FieldLabel htmlFor="student-search">Paieška:</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>MOK-</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="student-search"
            type="search"
            autoComplete="off"
            className="pl-0!"
            value={searchInput}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setSearchInput(e.target.value.trim())
              }
            }}
          />
        </InputGroup>
      </Field>


      <div className="overflow-x-auto">
        <table className="text-center min-w-96">
          <thead>
          <tr>
            <th className="w-1/12">Eil. Nr.</th>
            <th className="w-1/6">MOK numeris</th>
            <th className="w-1/6">Teritorinis / neteritorinis/ be eilės</th>
            <th className="w-1/6">Pirmumo taškų suma</th>
            <th>Priimtas / nepriimtas</th>
          </tr>
          </thead>
          <tbody>
          {filteredData.map((x) => {
            return (
              <tr key={x.id}>
                <td>{x.nr}</td>
                <td>{x.idPrefix}{x.id}</td>
                <td>{x.status}</td>
                <td>{x.score}</td>
                <td>{x.result}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}