import React, { ReactNode, useEffect, useState } from 'react'
import { LoaderSmall } from '../../components/common/Loaders'
import StudentLayout from '../../components/common/StudentLayout'
import ProblemsTable from '../../components/problems/ProblemsTable'
import useAllProblems from '../../lib/hooks/useAllProblems'
import { ProblemDifficultyType, ProblemsInfo, ProblemStatus } from '../../types/problems'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Dashboard Sidebar</h1>
        )
    }

    const { loading, data, refetch, error } = useAllProblems()
    const [problems, setProblems] = useState<ProblemsInfo[]>([])

    useEffect(() => {
        if (data) {
            setProblems(data.problems)
        }
    }, [refetch, data])


    return (
        <StudentLayout sidebar={<Sidebar />}>
            {
                loading ? (
                    <div className="w-full flex items-center justify-center">
                        <LoaderSmall />
                    </div>
                ) : (
                    <ProblemsTable problems={problems} />
                )
            }
        </StudentLayout>
    )
}

export default IndexPage