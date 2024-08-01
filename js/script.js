document.addEventListener('input', updateMarks);

        function updateMarks() {
            const theoryInputs = document.querySelectorAll('.theory');
            const practicalInputs = document.querySelectorAll('.practical');
            const totalCells = document.querySelectorAll('.total');
            const totalWordsCells = document.querySelectorAll('.total-words');
            let grandTotal = 0;
            let maxTotal = 0;
            let theoryTotal = 0;
            let practicalTotal = 0;

            theoryInputs.forEach((input, index) => {
                const max = parseInt(input.dataset.max);
                const theoryMarks = parseInt(input.value) || 0;
                const total = Math.min(theoryMarks, max);
                grandTotal += total;
                theoryTotal += total;
                maxTotal += max;
                totalCells[index].textContent = total;
                totalWordsCells[index].textContent = numberToWords(total);
            });

            practicalInputs.forEach((input, index) => {
                const max = parseInt(input.dataset.max);
                const practicalMarks = parseInt(input.value) || 0;
                const total = Math.min(practicalMarks, max);
                grandTotal += total;
                practicalTotal += total;
                maxTotal += max;
                const actualIndex = theoryInputs.length + index;
                totalCells[actualIndex].textContent = total;
                totalWordsCells[actualIndex].textContent = numberToWords(total);
            });

            const grandTotalCell = document.getElementById('grand-total');
            grandTotalCell.textContent = grandTotal;

            const grandTotalWords = document.getElementById('grand-total-words');
            grandTotalWords.textContent = numberToWords(grandTotal);

            const percentage = (grandTotal / maxTotal) * 100;
            const percentageCell = document.getElementById('percentage');
            percentageCell.textContent = percentage.toFixed(2) + '%';

            const gradeCell = document.getElementById('grade');
            gradeCell.textContent = getGrade(percentage);
        }

        function numberToWords(number) {
            const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety','Hundred'];
            if (number === 0) return 'Zero';
            if (number < 20) return words[number];
            if (number < 100) return words[18 + Math.floor(number / 10)] + (number % 10 ? ' ' + words[number % 10] : '');
            if (number < 1000) {
            const hundreds = Math.floor(number / 100);
            const remainder = number % 100;
            return words[hundreds] + ' Hundred' + (remainder ? ' ' + numberToWords(remainder) : '');
            }
            return number; 
        }

        function getGrade(percentage) {
            if (percentage >= 90) return 'A+';
            if (percentage >= 80) return 'A';
            if (percentage >= 70) return 'B+';
            if (percentage >= 60) return 'B';
            if (percentage >= 50) return 'C+';
            if (percentage >= 40) return 'C';
            return 'F';
        }


        