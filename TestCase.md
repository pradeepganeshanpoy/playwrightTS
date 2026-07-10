# Test case 1: Language filter → Java
- Open page
- Select Language = Java
- Verify only Java courses are visible
- 1️⃣ Fails if language filter is not reapplied on change

# Test case 2: Level filter → Beginner only
- Open page
- Uncheck Intermediate and Advanced
- Verify that only Beginner courses are visible
- 1️⃣ Fails if unchecked levels still pass the filter

# Test case 3: Min enrollments → 10,000+
- Open page
- Open “Min enrollments” dropdown and choose 10,000+
- Verify every visible row shows enrollments ≥ 10,000
- 1️⃣ Fails if numeric comparison is done as strings

# Test case 4: Combined filters → Python + Beginner + 10,000+
- Open page
- Select Language = Python
- Uncheck Intermediate and Advanced
- Set Min enrollments = 10,000+
- Verify only Python Beginner courses with ≥ 10,000 enrollments are visible
- 1️⃣ Fails if incorrect courses are visible

# Test case 5: No results state
- Open page
- Select a combination that yields no matches (e.g., Language with Level that does not exist)
- Verify “No matching courses.” is shown
- 1️⃣ Fails if no-data state does not toggle with filters

# Test case 6: Reset button visibility and behavior
- Open page
- Change any filter
- Verify the Reset button becomes visible
- Click Reset
- Verify Language = Any, all Levels checked, Min enrollments = Any
- Verify the Reset button is hidden and all rows are visible
- 1️⃣ Fails if defaults or visibility logic are not restored

# Test case 7: Sort by Enrollments (ascending, numeric)
- Open page
- Set Sort by = Enrollments
- Verify visible rows are ordered from smallest to largest enrollment
- Verify numbers with commas sort correctly
- 1️⃣ Fails if the sort is lexicographic

# Test case 8: Sort by Course Name (alphabetical)
- Open page
- Set Sort by = Course Name
- Verify visible rows are ordered A→Z by course name
- Verify order updates after changing filters
- 1️⃣ Fails if string compare ignores case/whitespace inconsistently