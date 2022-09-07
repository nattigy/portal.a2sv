import React, { ReactNode, useEffect, useState } from 'react'
import BaseLayout from '../../components/common/BaseLayout'
import { LoaderSmall } from '../../components/common/Loaders'
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
        <BaseLayout sidebar={<Sidebar />}>
            {
                loading ? (
                    <div className="w-full flex items-center justify-center">
                        <LoaderSmall />
                    </div>
                ) : (
                    <ProblemsTable problems={problems} />
                )
            }
        </BaseLayout>
    )
}

export default IndexPage