import React, { useMemo, useState } from 'react';

interface Props {
  children: [string];
}

export const InvitedStudentsList: React.FC<Props> = ({ children }) => {
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
          <span className="py-2 pl-3 text-base">MOK-</span>
          <input
            value={searchInput}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setSearchInput(e.target.value.trim());
              }
            }}
            type="search"
            name="q"
            id="student-search"
            autoComplete="off"
            maxLength={8}
            className="rounded-md border-0 pl-0 focus:ring-0"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-1/12">Eil. Nr.</th>
              <th className="w-1/6">Prašymo registracijos numeris</th>
              <th className="w-1/6">Klasė</th>
              <th className="w-1/6">Pirmumo taškų suma</th>
              <th className="">Mokinių priėmimo komisijos sprendimas</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((x) => {
              return (
                <tr key={x.id}>
                  <td className="text-center">{x.nr}</td>
                  <td className="text-center">
                    {x.idPreffix}
                    {x.id}
                  </td>
                  <td className="text-center">{x.classroom}</td>
                  <td className="text-center">{x.score}</td>
                  <td className="text-center">{x.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
