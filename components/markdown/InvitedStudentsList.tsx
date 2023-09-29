import React, { useMemo, useRef, useState } from 'react';

interface Props {
  children: [string];
}

export const InvitedStudentsList: React.FC<Props> = ({ children }) => {
  const inputRef = useRef<HTMLInputElement>();
  const data = useMemo(() => {
    return children[0]
      .split(/\r?\n/)
      .filter((x) => x.length > 0)
      .map((x) => {
        const [nr, idPreffix, id, classroom, score, result] = x.split(',');
        return { nr, idPreffix, id, classroom, score, result };
      });
  }, [children]);
  const [searchInput, setSearchInput] = useState('');
  const filteredData = data.filter((x) => x.id.startsWith(searchInput));

  return (
    <>
      <div className="my-4 flex flex-col items-center gap-3 sm:flex-row">
        <label htmlFor="student-search">Paieška:</label>
        <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-600">
          <span
            className="cursor-text select-none py-2 pl-3 text-base"
            onClick={() => inputRef.current?.focus()}
          >
            MOK-
          </span>
          <input
            ref={inputRef}
            value={searchInput}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setSearchInput(e.target.value.trim());
              }
            }}
            type="search"
            id="student-search"
            autoComplete="off"
            maxLength={8}
            className="rounded-md border-0 pl-0 focus:ring-0"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th className="w-1/12">Eil. Nr.</th>
              <th className="w-1/6">Prašymo registracijos numeris</th>
              <th className="w-1/6">Klasė</th>
              <th className="w-1/6">Pirmumo taškų suma</th>
              <th>Mokinių priėmimo komisijos sprendimas</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((x) => {
              return (
                <tr key={x.id}>
                  <td>{x.nr}</td>
                  <td>{`${x.idPreffix}${x.id}`}</td>
                  <td>{x.classroom}</td>
                  <td>{x.score}</td>
                  <td>{x.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
