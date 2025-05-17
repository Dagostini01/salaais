import React from "react";
import { Container, ProgressBar, ProgressText } from "./styles";

type Props = {
    scoreByBlock: Record<number, number>;
};


export function ProgressStatusBar({ scoreByBlock }: Props) {
    const blocos = Object.keys(scoreByBlock).map(Number);
    const totalPercent = blocos.reduce((acc, bloco) => acc + (scoreByBlock[bloco] || 0), 0) / blocos.length;

    let status: "success" | "primary" | "attention" = "attention";
    let label = "REPROVADO";

    const reprovados = blocos.filter((bloco) => (scoreByBlock[bloco] ?? 0) < 70);
    const segundaEpoca = blocos.filter((bloco) => {
        const nota = scoreByBlock[bloco] ?? 0;
        return nota >= 30 && nota < 70;
    });

    if (reprovados.length === 0) {
        status = "success";
        label = "APROVADO";
    } else if (reprovados.length === 1 && segundaEpoca.length === 1) {
        status = "primary";
        label = "2ª ÉPOCA";
    }

    return (
        <Container>
            <ProgressBar status={status}>
                <ProgressText>{label} - {totalPercent.toFixed(0)}%</ProgressText>
            </ProgressBar>
        </Container>
    );
}
